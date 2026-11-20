import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import balanceRoutes from "./routes/balanceRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import checkAuth from "./middleware/authMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// // Test endpoint
// app.get("/api/health", (req, res) => {
//   res.json({
//     message: "LeaveEase backend is running!"
//   });
// });

// app.use("/api/users", userRoutes);
// app.use("/api/leave-requests", leaveRoutes);
// app.use("/api/leave-balances", balanceRoutes);

app.use("/api/users", checkAuth, userRoutes);
app.use("/api/leave-requests", checkAuth, leaveRoutes);
app.use("/api/leave-balances", checkAuth, balanceRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});