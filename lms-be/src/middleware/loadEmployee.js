import { prisma } from "../config/prisma.js";

const loadEmployee = async (req, res, next) => {
    try {
        const auth0sub = req.auth.payload.sub;

        const employee = await prisma.employee.findUnique({
            where: {
                auth0sub: auth0sub
            }
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee record not found"
            });
        }

        req.employee = employee;

        next();

    } catch (error) {
        console.error("Error loading employee:", error);

        res.status(500).json({
            message: "Failed to load employee"
        });
    }
};

export default loadEmployee;