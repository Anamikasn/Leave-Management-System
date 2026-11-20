import express from "express";
const router = express.Router();

/**
 * @openapi
 * /api/leave-balances/me:
 *   get:
 *     summary: Get the logged-in employee's leave balances
 *     tags:
 *       - Leave Balances
 *     responses:
 *       200:
 *         description: Leave balances successfully fetched
 */




router.get("/me",(req,res)=>{
    res.json({
        message:"Leave Balances Fetched Successfully!"
    })
});


// /**
//  * @openapi
//  * /api/leave-balances/{id}:
//  *   get:
//  *     summary: Get an employee's leave balances
//  *     tags:
//  *       - Leave Balances
//  *     parameters:
//          - in: path
//             name: id
//             required: true
//             schema:
//             type: integer
//             description: Employee ID
//  *     responses:
//  *       200:
//  *         description: Leave balances of user ${id} successfully fetched
//  */



router.get("/:id",(req,res)=>{
    const id = req.params.id;
    res.json({
        message:`Leave Balances for user ${id} fetched successfully!`
    })
});




export default router;