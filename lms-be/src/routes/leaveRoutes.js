import express from "express";

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


router.get("/me",(req,res)=>{
    const status = req.query.status;
    res.json({
        message:"Employee's leave requests successfully fetched!",
        status: status
    });

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


router.post("/me",(req,res)=>{
    const data = req.body;
    res.json({
        message:"Leave request successfully created!",
        data: data
    })
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

router.get("/",(req,res)=>{
    const status = req.query.status;
    res.json({
        message:"All leave requests fetched successfully!",
        status: status
    });
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


router.get("/:id",(req,res)=>{
    const id = req.params.id;
    res.json({
        message: `Leave request ${id} fetched successfully!`,
        id: id
    });
});



export default router;