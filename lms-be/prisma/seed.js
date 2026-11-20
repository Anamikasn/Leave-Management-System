import { prisma } from "../src/config/prisma.js";

// async function main() {
//     console.log("Starting database seeding...");
//     const employees = await prisma.employee.createMany({
//     data: [
//         {
//             auth0sub: "auth0|admin_demo",
//             emp_id: "EMP001",
//             name: "Rahul Menon",
//             email: "rahul@leaveease.com",
//             department: "HR",
//             role: "ADMIN",
//             joiningDate: new Date("2022-01-10")
//         },
//         {
//             auth0sub: "auth0|employee_demo_1",
//             emp_id: "EMP002",
//             name: "Ananya Nair",
//             email: "ananya@leaveease.com",
//             department: "Engineering",
//             role: "EMPLOYEE",
//             joiningDate: new Date("2023-06-15")
//         },
//         {
//             auth0sub: "auth0|employee_demo_2",
//             emp_id: "EMP003",
//             name: "Arjun Kumar",
//             email: "arjun@leaveease.com",
//             department: "Finance",
//             role: "EMPLOYEE",
//             joiningDate: new Date("2024-02-01")
//         },
//         {
//             auth0sub: "auth0|employee_demo_3",
//             emp_id: "EMP004",
//             name: "Meera Thomas",
//             email: "meera@leaveease.com",
//             department: "Marketing",
//             role: "EMPLOYEE",
//             joiningDate: new Date("2023-09-20")
//         }
//     ]
// });

// console.log(`${employees.count} employees inserted successfully!`);

// const allEmployees = await prisma.employee.findMany();

// console.log("Employees in database:", allEmployees);
// }



async function main() {
    const employees = await prisma.employee.findMany();
    const leaveTypes = await prisma.leaveType.findMany();
    const leaveBalances = await prisma.leaveBalance.findMany();
    const leaveRequests = await prisma.leaveRequest.findMany();

    console.log("Employees:", employees);
    console.log("Leave Types:", leaveTypes);
    console.log("Leave Balances:", leaveBalances);
    console.log("Leave Requests:", leaveRequests);

//     const leaveTypes = await prisma.leaveType.createMany({
//     data: [
//         {
//             leave_name: "Casual Leave",
//             description: "Leave for personal matters",
//             default_days: 12,
//             is_paid: true
//         },
//         {
//             leave_name: "Sick Leave",
//             description: "Leave for illness or medical reasons",
//             default_days: 10,
//             is_paid: true
//         },
//         {
//             leave_name: "Earned Leave",
//             description: "Annual earned vacation leave",
//             default_days: 15,
//             is_paid: true
//         }
//     ]
// });

// const leaveRequests = await prisma.leaveRequest.createMany({
//     data: [
//         {
//             emp_id: 2,
//             leave_id: 1,
//             total_days: 2,
//             start_date: new Date("2026-11-23"),
//             end_date: new Date("2026-11-24"),
//             reason: "Personal work",
//             status: "PENDING"
//         },
//         {
//             emp_id: 2,
//             leave_id: 2,
//             total_days: 2,
//             start_date: new Date("2026-10-12"),
//             end_date: new Date("2026-10-13"),
//             reason: "Medical reasons",
//             status: "APPROVED",
//             manager_id: 1,
//             comments: "Approved",
//             actionDate: new Date("2026-10-10")
//         },
//         {
//             emp_id: 3,
//             leave_id: 3,
//             total_days: 3,
//             start_date: new Date("2026-11-25"),
//             end_date: new Date("2026-11-27"),
//             reason: "Family vacation",
//             status: "REJECTED",
//             manager_id: 1,
//             comments: "Insufficient staffing",
//             actionDate: new Date("2026-11-20")
//         }
//     ]
// });

// const leaveBalances = await prisma.leaveBalance.createMany({
//     data: [
//         // Ananya - Employee ID 2
//         {
//             emp_id: 2,
//             leave_id: 1,
//             days_total: 12,
//             days_used: 2,
//             year: 2026
//         },
//         {
//             emp_id: 2,
//             leave_id: 2,
//             days_total: 10,
//             days_used: 2,
//             year: 2026
//         },
//         {
//             emp_id: 2,
//             leave_id: 3,
//             days_total: 15,
//             days_used: 0,
//             year: 2026
//         },

//         // Arjun - Employee ID 3
//         {
//             emp_id: 3,
//             leave_id: 1,
//             days_total: 12,
//             days_used: 0,
//             year: 2026
//         },
//         {
//             emp_id: 3,
//             leave_id: 2,
//             days_total: 10,
//             days_used: 0,
//             year: 2026
//         },
//         {
//             emp_id: 3,
//             leave_id: 3,
//             days_total: 15,
//             days_used: 3,
//             year: 2026
//         },

//         // Meera - Employee ID 4
//         {
//             emp_id: 4,
//             leave_id: 1,
//             days_total: 12,
//             days_used: 0,
//             year: 2026
//         },
//         {
//             emp_id: 4,
//             leave_id: 2,
//             days_total: 10,
//             days_used: 0,
//             year: 2026
//         },
//         {
//             emp_id: 4,
//             leave_id: 3,
//             days_total: 15,
//             days_used: 0,
//             year: 2026
//         }
//     ]
// });

// console.log(`${leaveBalances.count} leave balances inserted successfully!`);

// console.log(`${leaveRequests.count} leave requests inserted successfully!`);

// console.log(`${leaveTypes.count} leave types inserted successfully!`);

    // console.log("Starting database verification...");

    // const allLeaveTypes = await prisma.leaveType.findMany();

    // console.log("Leave types in database:", allLeaveTypes);
}

main()
    
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });



