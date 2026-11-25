import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get the logged-in employee's profile
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Profile successfully fetched
 */

router.get("/me",(req,res)=>{
    
    res.json({
        message : "Profile successfully fetched!",
        employee: {
            id: req.employee.id,
            emp_id: req.employee.emp_id,
            name: req.employee.name,
            email: req.employee.email,
            department: req.employee.department,
            role: req.employee.role,
            joiningDate: req.employee.joiningDate
        }
    });

});


/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get an employee's profile by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profile successfully fetched
 */

// router.get("/:id",(req,res)=>{
//     const id = req.params.id;
//     res.json({
//        message : `Profile of the user ${id} fetched successfully!`,
//        employee: {
//                 id: req.employee.id,
//                 emp_id: req.employee.emp_id,
//                 name: req.employee.name,
//                 email: req.employee.email,
//                 department: req.employee.department,
//                 role: req.employee.role,
//                 joiningDate: req.employee.joiningDate
//             }
//     });
// });

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Profile successfully fetched!",
            employee: {
                id: employee.id,
                emp_id: employee.emp_id,
                name: employee.name,
                email: employee.email,
                department: employee.department,
                role: employee.role,
                joiningDate: employee.joiningDate
            }
        });

    } catch (error) {
        console.error("Error fetching employee:", error);

        res.status(500).json({
            message: "Failed to fetch employee profile"
        });
    }
});





export default router;