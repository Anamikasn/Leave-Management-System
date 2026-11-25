import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();


/**
 * @openapi
 * /api/leave-types:
 *   get:
 *     summary: Get all available leave types
 *     tags:
 *       - Leave Types
 *     responses:
 *       200:
 *         description: Leave types successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Leave types fetched successfully
 *                 leaveTypes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       leave_name:
 *                         type: string
 *                         example: Casual Leave
 *                       description:
 *                         type: string
 *                         example: Leave for personal purposes
 *                       default_days:
 *                         type: integer
 *                         example: 12
 *                       is_paid:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Internal server error
 */

router.get("/", async (req, res) => {
  try {
    const leaveTypes = await prisma.leaveType.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json({
      message: "Leave types fetched successfully",
      leaveTypes: leaveTypes,
    });
  } catch (error) {
    console.error("Error fetching leave types:", error);

    res.status(500).json({
      message: "Failed to fetch leave types",
    });
  }
});



export default router;