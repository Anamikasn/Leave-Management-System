import { prisma } from "./config/prisma.js";

async function testConnection() {
  try {
    await prisma.$connect();

    console.log("Database connected successfully!");

    const employees = await prisma.employee.findMany();

    console.log("Employees:", employees);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();