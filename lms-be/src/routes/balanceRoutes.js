import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();

/**
 * @openapi
 * /api/leave-balances/me:
 *   get:
 *     summary: Get the logged-in employee's leave balances and available leave types
 *     tags:
 *       - Leave Balances
 *     responses:
 *       200:
 *         description: Leave balances and available leave types successfully fetched
 */




// router.get("/me",(req,res)=>{
//     res.json({
//         message:"Leave Balances Fetched Successfully!"
//     })
// });


router.get("/me", async (req, res) => {
    try {
        const year = req.query.year
            ? Number(req.query.year)
            : new Date().getFullYear();

        if (!Number.isInteger(year) || year < 2000) {
            return res.status(400).json({
                message: "Invalid year"
            });
        }

        const [balances, leaveTypes] = await Promise.all([
            prisma.leaveBalance.findMany({
                where: {
                    emp_id: req.employee.id,
                    year
                },
                include: {
                    leavetype: true
                }
            }),
            prisma.leaveType.findMany({
                orderBy: {
                    leave_name: "asc"
                }
            })
        ]);

        const balancesWithRemainingDays = balances.map((balance) => ({
            ...balance,
            days_remaining: balance.days_total - balance.days_used
        }));

        res.json({
            message: "Leave balances fetched successfully",
            year,
            balances: balancesWithRemainingDays,
            leaveTypes
        });

    } catch (error) {
        console.error("Error fetching my leave balances:", error);

        res.status(500).json({
            message: "Failed to fetch leave balances"
        });
    }
});



/**
 * @openapi
 * /api/leave-balances/{id}:
 *   get:
 *     summary: Get an employee's leave balances
 *     tags:
 *       - Leave Balances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leave balances successfully fetched
 */


// router.get("/:id",(req,res)=>{
//     const id = req.params.id;
//     res.json({
//         message:`Leave Balances for user ${id} fetched successfully!`
//     })
// });

router.get("/:id", async (req, res) => {
    try {
        if (req.employee.role !== "ADMIN") {
            return res.status(403).json({
                message: "Only Admin can view another employee's leave balances"
            });
        }

        const employeeId = Number(req.params.id);

        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        const year = req.query.year
            ? Number(req.query.year)
            : new Date().getFullYear();

        if (!Number.isInteger(year) || year < 2000) {
            return res.status(400).json({
                message: "Invalid year"
            });
        }

        const balances = await prisma.leaveBalance.findMany({
            where: {
                emp_id: employeeId,
                year
            },
            include: {
                leavetype: true
            }
        });

        const balancesWithRemainingDays = balances.map((balance) => ({
            ...balance,
            days_remaining: balance.days_total - balance.days_used
        }));

        res.json({
            message: "Employee leave balances fetched successfully",
            employee_id: employeeId,
            year,
            balances: balancesWithRemainingDays
        });

    } catch (error) {
        console.error("Error fetching employee leave balances:", error);

        res.status(500).json({
            message: "Failed to fetch employee leave balances"
        });
    }
});





export default router;