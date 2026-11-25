import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();

// router.get("/me",(req,res)=>{

//     res.json({
//         message:"Employee's leave requests successfully fetched!"
//     })

// });


/**
 * @openapi
 * /api/leave-requests/me:
 *   get:
 *     summary: Get the logged-in employee's leave requests
 *     tags:
 *       - Leave Requests
 *     responses:
 *       200:
 *         description: Leave requests successfully fetched
 */


// router.get("/me",(req,res)=>{
//     const status = req.query.status;
//     res.json({
//         message:"Employee's leave requests successfully fetched!",
//         status: status
//     });

// });

router.get("/me", async (req, res) => {
    try {
        const leaveRequests = await prisma.leaveRequest.findMany({
            where: {
                emp_id: req.employee.id
            },
            include: {
                leaveType: true
            },
            orderBy: {
                start_date: "desc"
            }
        });

        res.json({
            message: "Leave requests fetched successfully!",
            leaveRequests: leaveRequests
        });

    } catch (error) {
        console.error("Error fetching leave requests:", error);

        res.status(500).json({
            message: "Failed to fetch leave requests"
        });
    }
});


/**
 * @openapi
 * /api/leave-requests/me:
 *   post:
 *     summary: Create a new leave request
 *     tags:
 *       - Leave Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leave_id
 *               - start_date
 *               - end_date
 *               - reason
 *             properties:
 *               leave_id:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leave request successfully created
 */


// router.post("/me",(req,res)=>{
//     const data = req.body;
//     res.json({
//         message:"Leave request successfully created!",
//         data: data
//     })
// });


router.post("/me", async (req, res) => {
    try {
        const { leave_id, start_date, end_date, reason } = req.body;

        if (!leave_id || !start_date || !end_date || !reason) {
            return res.status(400).json({
                message: "Leave type, start date, end date and reason are required"
            });
        }

        const leaveId = Number(leave_id);

        if (!Number.isInteger(leaveId) || leaveId <= 0) {
            return res.status(400).json({
                message: "Invalid leave type ID"
            });
        }

        // Validate date format and convert to Date objects
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!datePattern.test(start_date) || !datePattern.test(end_date)) {
            return res.status(400).json({
                message: "Dates must be in YYYY-MM-DD format"
            });
        }

        const startDate = new Date(`${start_date}T00:00:00.000Z`);
        const endDate = new Date(`${end_date}T00:00:00.000Z`);

        if (
            Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime())
        ) {
            return res.status(400).json({
                message: "Invalid date"
            });
        }

        if (startDate > endDate) {
            return res.status(400).json({
                message: "Start date cannot be after end date"
            });
        }

        // Calculate working days, excluding Saturday and Sunday
        let totalDays = 0;

        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const day = currentDate.getUTCDay();

            if (day !== 0 && day !== 6) {
                totalDays++;
            }

            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        if (totalDays === 0) {
            return res.status(400).json({
                message: "The selected date range contains no working days"
            });
        }

        // Check that the requested leave type exists
        const leaveType = await prisma.leaveType.findUnique({
            where: {
                id: leaveId
            }
        });

        if (!leaveType) {
            return res.status(404).json({
                message: "Leave type not found"
            });
        }

        // Create the leave request
        const leaveRequest = await prisma.leaveRequest.create({
            data: {
                emp_id: req.employee.id,
                leave_id: leaveId,
                total_days: totalDays,
                start_date: startDate,
                end_date: endDate,
                reason,
                status: "PENDING"
            },
            include: {
                leaveType: true
            }
        });

        res.status(201).json({
            message: "Leave request submitted successfully",
            leaveRequest
        });

    } catch (error) {
        console.error("Error creating leave request:", error);

        res.status(500).json({
            message: "Failed to submit leave request"
        });
    }
});



/**
 * @openapi
 * /api/leave-requests:
 *   get:
 *     summary: Get all leave requests of all statuses
 *     tags:
 *       - Leave Requests
 *     responses:
 *       200:
 *         description: Leave requests successfully fetched
 */

// router.get("/",(req,res)=>{
//     const status = req.query.status;
//     res.json({
//         message:"All leave requests fetched successfully!",
//         status: status
//     });
// });

router.get("/", async (req, res) => {
    try {
        if (req.employee.role !== "ADMIN") {
            return res.status(403).json({
                message: "Only Admin can view all leave requests"
            });
        }

        const { status } = req.query;

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid leave request status"
            });
        }

        const leaveRequests = await prisma.leaveRequest.findMany({
            where: status ? { status } : {},
            include: {
                leaveType: true,
                employee: true
            },
            orderBy: {
                start_date: "desc"
            }
        });

        res.json({
            message: "All leave requests fetched successfully",
            leaveRequests
        });

    } catch (error) {
        console.error("Error fetching all leave requests:", error);

        res.status(500).json({
            message: "Failed to fetch leave requests"
        });
    }
});



/**
 * @openapi
 * /api/leave-requests/{id}:
 *   get:
 *     summary: Get a specific leave request by ID
 *     tags:
 *       - Leave Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leave request successfully fetched
 */


// router.get("/:id",(req,res)=>{
//     const id = req.params.id;
//     res.json({
//         message: `Leave request ${id} fetched successfully!`,
//         id: id
//     });
// });

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid leave request ID"
            });
        }

        const leaveRequest = await prisma.leaveRequest.findMany({
            where: {
                emp_id: req.employee.id
            },
            include: {
                leaveType: true,
                employee: true
            }
        });

        if (!leaveRequest) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        // Employees can only view their own requests
        if (
            req.employee.role !== "ADMIN" &&
            leaveRequest.emp_id !== req.employee.id
        ) {
            return res.status(403).json({
                message: "You cannot view another employee's leave request"
            });
        }

        res.json({
            message: "Leave request fetched successfully",
            leaveRequest
        });

    } catch (error) {
        console.error("Error fetching leave request:", error);

        res.status(500).json({
            message: "Failed to fetch leave request"
        });
    }
});




/**
 * @openapi
 * /api/leave-requests/{id}/status:
 *   patch:
 *     summary: Update the status of a specific leave request
 *     tags:
 *       - Leave Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the leave request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - APPROVED
 *                   - REJECTED
 *                 example: APPROVED
 *               comments:
 *                 type: string
 *                 example: Leave approved
 *     responses:
 *       200:
 *         description: Leave request status successfully updated
 *       400:
 *         description: Invalid request ID or status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only admins can update the status
 *       404:
 *         description: Leave request not found
 *       500:
 *         description: Internal server error
 */




router.patch("/:id/status", async (req, res) => {
    try {
        const id = Number(req.params.id);

        // 1. Validate leave request ID
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid leave request ID"
            });
        }

        // 2. Check whether the logged-in user is an admin
        if (!req.employee || req.employee.role !== "ADMIN") {
            return res.status(403).json({
                message: "Only admins can update leave request status"
            });
        }

        // 3. Get status and comments from frontend
        const { status, comments } = req.body;

        // 4. Validate status
        if (!["APPROVED", "REJECTED"].includes(status)) {
            return res.status(400).json({
                message: "Status must be APPROVED or REJECTED"
            });
        }

        // 5. Find the leave request in database
        const existingRequest = await prisma.leaveRequest.findUnique({
            where: {
                id: id
            }
        });

        if (!existingRequest) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        // 6. Only pending requests can be updated
        if (existingRequest.status !== "PENDING") {
            return res.status(400).json({
                message: "Only pending leave requests can be updated"
            });
        }

        // 7. Update the leave request in database
        const updatedRequest = await prisma.leaveRequest.update({
            where: {
                id: id
            },
            data: {
                status: status,
                manager_id: req.employee.id,
                actionDate: new Date(),
                comments: comments || null
            },
            include: {
                employee: true,
                leaveType: true
            }
        });

        // 8. Send updated request to frontend
        return res.status(200).json({
            message: "Leave request status updated successfully",
            leaveRequest: updatedRequest
        });

    } catch (error) {
        console.error("Error updating leave request status:", error);

        return res.status(500).json({
            message: "Failed to update leave request status"
        });
    }
});





export default router;