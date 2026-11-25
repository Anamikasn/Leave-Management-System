
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.ts";

// Read the database URL from .env
const databaseUrl = new URL(process.env.DATABASE_URL);

// Configure the MySQL connection
const adapter = new PrismaMariaDb({

  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.slice(1),
  connectionLimit: 5,
  allowPublicKeyRetrieval: true,
});

// Create Prisma Client
const prisma = new PrismaClient({ adapter });

// Export it so other files can use it
export { prisma };
