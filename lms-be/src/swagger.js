import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "LeaveEase API Documentation",
            version: "1.0.0",
            description: "API documentation for the LeaveEase Leave Management System"
        },

        servers: [
            {
                url: "http://localhost:4000",
                description: "Local development server"
            }
        ]
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;