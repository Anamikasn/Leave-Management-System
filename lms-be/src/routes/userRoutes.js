import express from "express";

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
        message : "Profile successfully fetched!"
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

router.get("/:id",(req,res)=>{
    const id = req.params.id;
    res.json({
       message : "Profile of the user ${id} fetched successfully!" 
    });
});





export default router;