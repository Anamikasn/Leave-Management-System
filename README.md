# LeaveManager

A web-based Leave Management System that allows employees to apply for leave and track their leave requests, while administrators can review, approve, or reject requests through a centralized dashboard.

## 1. Topic and Description

**Topic:** Employee Leave Management System

LeaveManager is a web application developed to simplify and digitize the employee leave management process.

The application provides a centralized platform for employees to submit leave requests and monitor their status. Administrators can view leave requests from employees and manage them by approving or rejecting pending requests.

The system uses role-based access control to provide different functionalities to employees and administrators. Authentication is handled using Auth0, and application data is stored in a relational database using Prisma ORM.

### Key Features

- Secure authentication using Auth0
- Employee and administrator dashboards
- Apply for leave by selecting a leave type
- View personal leave requests
- Track leave request status
- View leave balances
- View all employee leave requests as an administrator
- Approve or reject pending leave requests
- Fetch leave types dynamically from the database
- Display leave request summaries and statistics

## 2. Technology Stack

| Layer             | Technology                      |
| ----------------- | ------------------------------- |
| Frontend          | React, TypeScript, Tailwind CSS |
| Backend           | Node.js, Express.js             |
| Database          | MySQL                           |
| ORM               | Prisma                          |
| Authentication    | Auth0                           |
| API Documentation | Swagger / OpenAPI               |
| Version Control   | Git and GitHub                  |

## 3. Architecture

LeaveManager follows a client-server architecture.

The React frontend communicates with the Express backend through REST APIs. Auth0 is used to authenticate users, and the backend validates access tokens before allowing access to protected endpoints.

Prisma ORM handles database operations between the backend and the MySQL database.

```mermaid
flowchart TD
    User[Employee / Administrator]

    subgraph Frontend
        UI[React Frontend]
        Auth0SDK[Auth0 React SDK]
        API[API Service]
    end

    subgraph Authentication
        Auth0[Auth0 Authentication]
    end

    subgraph Backend
        Express[Node.js / Express API]
        Middleware[Authentication Middleware]
        Routes[Leave Request and Leave Type Routes]
        Prisma[Prisma ORM]
    end

    DB[(MySQL Database)]

    User --> UI
    UI --> Auth0SDK
    Auth0SDK <--> Auth0
    UI --> API
    API --> Express
    Express --> Middleware
    Middleware --> Auth0
    Middleware --> Routes
    Routes --> Prisma
    Prisma --> DB
```

### Architecture Flow

1. The user logs in through Auth0.
2. Auth0 authenticates the user and provides an access token.
3. The frontend sends API requests to the Express backend with the required authorization token.
4. The backend authentication middleware validates the token and identifies the user.
5. The backend processes the request using the appropriate route and Prisma ORM.
6. Prisma retrieves or updates data in the MySQL database.
7. The backend returns the response to the frontend.

## 4. Roles and Permissions

LeaveManager supports two primary roles.

### Employee

An employee can:

- Log in securely using Auth0.
- View their dashboard.
- Apply for leave by selecting a leave type.
- Enter the leave start date, end date, and reason.
- View their own leave requests.
- Track whether a request is pending, approved, or rejected.
- View their leave balance.

Employees cannot approve or reject leave requests or access other employees' leave request records.

### Administrator

An administrator can:

- Log in to the administrator dashboard.
- View leave request statistics.
- View leave requests submitted by employees.
- View employee and leave type details.
- View pending leave requests.
- Approve pending leave requests.
- Reject pending leave requests.
- View requests of different statuses.

Administrators are authorized to manage leave requests, while employees are restricted to their own records.

## 5. Database

The application uses MySQL as its relational database and Prisma ORM for database access.

### Main Database Models

| Model        | Description                                               |
| ------------ | --------------------------------------------------------- |
| Employee     | Stores employee information and identity details          |
| LeaveType    | Stores available leave types and their default leave days |
| LeaveRequest | Stores employee leave applications and their status       |
| LeaveBalance | Stores leave balances for employees                       |

### Leave Request Statuses

- `PENDING` – Request is awaiting administrator action.
- `APPROVED` – Request has been approved.
- `REJECTED` – Request has been rejected.
- `CANCELLED` – Request has been cancelled, if supported by the application workflow.

A leave request is associated with an employee and a leave type.

## 6. Setup Instructions

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MySQL or MariaDB
- Git
- An Auth0 account

### Step 1: Clone the Repository

```bash
git clone https://github.com/Anamikasn/Leave-Management-System.git
cd Leave-Management-System
```

### Step 2: Configure the Backend

Navigate to the backend folder:

```bash
cd lms-be
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory and configure the required environment variables.

Example:

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/leavemanager_db"
AUTH0_DOMAIN="your-auth0-domain"
AUTH0_AUDIENCE="your-api-audience"
PORT=4000
```

Replace the placeholder values with your actual database and Auth0 configuration.

### Step 3: Configure the Database

Create the database in MySQL:

```sql
CREATE DATABASE leavemanager_db;
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

If the project contains a seed script, run it using the seed command configured in `package.json` or Prisma configuration.

### Step 4: Start the Backend

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:4000
```

If your backend uses a different development script, use the script defined in its `package.json`.

### Step 5: Configure the Frontend

Open another terminal:

```bash
cd lms-fe
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory.

Example:

```env
VITE_AUTH0_DOMAIN="your-auth0-domain"
VITE_AUTH0_CLIENT_ID="your-auth0-client-id"
VITE_AUTH0_AUDIENCE="your-api-audience"
```

Use the exact variable names expected by your frontend Auth0 configuration.

### Step 6: Start the Frontend

```bash
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

Open the URL in your browser and log in using Auth0.

## 7. Environment Variables

The following environment variables are required for local development.

### Backend Environment Variables

| Variable         | Description                                   |
| ---------------- | --------------------------------------------- |
| `DATABASE_URL`   | MySQL connection string used by Prisma        |
| `AUTH0_DOMAIN`   | Auth0 tenant domain used for token validation |
| `AUTH0_AUDIENCE` | Identifier of the Auth0 API                   |
| `PORT`           | Port on which the backend server runs         |

### Frontend Environment Variables

| Variable               | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `VITE_AUTH0_DOMAIN`    | Auth0 domain used by the frontend              |
| `VITE_AUTH0_CLIENT_ID` | Auth0 application client ID                    |
| `VITE_AUTH0_AUDIENCE`  | Auth0 API audience used when requesting tokens |

**Security:** Never commit actual database passwords, Auth0 client secrets, or other sensitive credentials to GitHub. Keep local environment files out of version control.

## 8. API Documentation

The backend exposes REST APIs for leave type retrieval, leave request management, and leave balance retrieval.

All protected endpoints require a valid Auth0 access token in the Authorization header.

```http
Authorization: Bearer <access_token>
```

### Leave Types

| Method | Endpoint           | Required Role      | Description                     |
| ------ | ------------------ | ------------------ | ------------------------------- |
| GET    | `/api/leave-types` | Authenticated user | Fetch all available leave types |

### Leave Requests

| Method | Endpoint                         | Required Role | Description                                   |
| ------ | -------------------------------- | ------------- | --------------------------------------------- |
| GET    | `/api/leave-requests/me`         | Employee      | Fetch the logged-in employee's leave requests |
| POST   | `/api/leave-requests/me`         | Employee      | Create a leave request                        |
| GET    | `/api/leave-requests`            | Administrator | Fetch leave requests from all employees       |
| PATCH  | `/api/leave-requests/:id/status` | Administrator | Approve or reject a pending leave request     |

### Leave Balances

| Method | Endpoint                  | Required Role | Description                                     |
| ------ | ------------------------- | ------------- | ----------------------------------------------- |
| GET    | `/api/leave-balances/me`  | Employee      | Fetch the logged-in employee's leave balances   |
| GET    | `/api/leave-balances/:id` | Administrator | Fetch leave balance information for an employee |

### Example: Create a Leave Request

```http
POST /api/leave-requests/me
```

Request body:

```json
{
  "leave_id": 1,
  "start_date": "2026-11-28",
  "end_date": "2026-11-30",
  "reason": "Personal reasons"
}
```

### Example: Update Leave Request Status

```http
PATCH /api/leave-requests/5/status
```

Request body:

```json
{
  "status": "APPROVED"
}
```

The administrator can update the status of a pending leave request to `APPROVED` or `REJECTED`.

## 9. API Testing

The backend API can be tested using:

- Swagger UI, if enabled in the backend
- Postman
- Browser Developer Tools
- The LeaveManager frontend

For protected APIs, include a valid Auth0 access token in the request.

## 10. Project Structure

Leave-Management-System/
│
├── lms-fe/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   ├── public/
│   └── package.json
│
├── lms-be/
│   ├── src/
│   │   ├── config/
│   │   ├── generated/
│   │   │   └── prisma/    # Generated Prisma Client
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── ...
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── .env
│
└── README.md

The project structure may vary slightly depending on the current implementation.

## 11. Future Enhancements

- Automatic leave balance deduction after approval
- Leave balance initialization for new employees
- Holiday and weekend-aware leave day calculation
- Email notifications for leave request updates
- Employee profile management
- Leave request cancellation
- Advanced filtering and search for administrators

## 12. License

This project was developed for educational and project purposes.
