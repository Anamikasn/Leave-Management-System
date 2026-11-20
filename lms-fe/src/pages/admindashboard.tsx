
import React, { useState } from 'react';

export default function AdminDashboard() {

    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 1,
            employeeName: "Ananya Nair",
            empId: "EMP002",
            leaveType: "Casual Leave",
            startDate: "23 Nov 2026",
            endDate: "24 Nov 2026",
            days: 2,
            status: "Pending"
        },
        {
            id: 2,
            employeeName: "Ananya Nair",
            empId: "EMP002",
            leaveType: "Sick Leave",
            startDate: "12 Oct 2026",
            endDate: "13 Oct 2026",
            days: 2,
            status: "Approved"
        },
        {
            id: 3,
            employeeName: "Arjun Kumar",
            empId: "EMP003",
            leaveType: "Earned Leave",
            startDate: "25 Nov 2026",
            endDate: "27 Nov 2026",
            days: 3,
            status: "Rejected"
        }
    ]);

    const totalEmployees = 4;
    const totalRequests = leaveRequests.length;

    const pendingRequests = leaveRequests.filter(
        request => request.status === "Pending"
    ).length;

    const approvedRequests = leaveRequests.filter(
        request => request.status === "Approved"
    ).length;

    const rejectedRequests = leaveRequests.filter(
        request => request.status === "Rejected"
    ).length;

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Approved":
                return "bg-green-100 text-green-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleRequestAction = (id, newStatus) => {
        setLeaveRequests(previousRequests =>
            previousRequests.map(request =>
                request.id === id
                    ? { ...request, status: newStatus }
                    : request
            )
        );
    };

    const summaryCards = [
        {
            title: "Total Employees",
            count: totalEmployees,
            description: "Registered employees",
            color: "text-gray-800"
        },
        {
            title: "Total Leave Requests",
            count: totalRequests,
            description: "All requests",
            color: "text-gray-800"
        },
        {
            title: "Pending Requests",
            count: pendingRequests,
            description: "Awaiting approval",
            color: "text-yellow-600"
        },
        {
            title: "Approved Requests",
            count: approvedRequests,
            description: "Approved requests",
            color: "text-green-600"
        },
        {
            title: "Rejected Requests",
            count: rejectedRequests,
            description: "Rejected requests",
            color: "text-red-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">

            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        LeaveEase
                    </h2>

                    <h1 className="text-3xl font-bold text-gray-900 mt-6">
                        Welcome Back, Admin!
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Here's an overview of employee leave activity.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

                    {summaryCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-sm rounded-xl p-6 border border-gray-100"
                        >
                            <p className="text-sm text-gray-500">
                                {card.title}
                            </p>

                            <p className={`text-3xl font-bold mt-3 ${card.color}`}>
                                {card.count}
                            </p>

                            <p className="text-sm text-gray-400 mt-1">
                                {card.description}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Leave Requests */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Leave Requests
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Review and manage employee leave requests.
                            </p>
                        </div>

                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                        </button>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b border-gray-200 text-sm text-gray-500">
                                    <th className="py-3 px-4">Employee</th>
                                    <th className="py-3 px-4">Leave Type</th>
                                    <th className="py-3 px-4">Start Date</th>
                                    <th className="py-3 px-4">End Date</th>
                                    <th className="py-3 px-4">Days</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {leaveRequests.map((request) => (
                                    <tr
                                        key={request.id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >

                                        <td className="py-4 px-4">
                                            <p className="font-medium text-gray-800">
                                                {request.employeeName}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {request.empId}
                                            </p>
                                        </td>

                                        <td className="py-4 px-4 text-gray-600">
                                            {request.leaveType}
                                        </td>

                                        <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                                            {request.startDate}
                                        </td>

                                        <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                                            {request.endDate}
                                        </td>

                                        <td className="py-4 px-4 text-gray-600">
                                            {request.days}
                                        </td>

                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(request.status)}`}>
                                                {request.status}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4">

                                            {request.status === "Pending" ? (
                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() => handleRequestAction(request.id, "Approved")}
                                                        className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        onClick={() => handleRequestAction(request.id, "Rejected")}
                                                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                                                    >
                                                        Reject
                                                    </button>

                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs">
                                                    No actions
                                                </span>
                                            )}

                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        {leaveRequests.length === 0 && (
                            <p className="text-center text-gray-500 py-8">
                                No leave requests found.
                            </p>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}
