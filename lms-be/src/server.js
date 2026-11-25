import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import balanceRoutes from "./routes/balanceRoutes.js";
import leavetypeRoutes  from "./routes/leavetypeRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import checkAuth from "./middleware/authMiddleware.js";
import loadEmployee from "./middleware/loadEmployee.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


app.use("/api/users", checkAuth, loadEmployee, userRoutes);
app.use("/api/leave-requests", checkAuth, loadEmployee, leaveRoutes);
app.use("/api/leave-balances", checkAuth, loadEmployee, balanceRoutes);
app.use("/api/leave-types", checkAuth, loadEmployee, leavetypeRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});