import React from 'react';

export default function UserDashboard() {

    const leaveRequests = [
        {
            id: 1,
            leaveType: "Casual Leave",
            startDate: "20 Nov 2026",
            endDate: "23 Nov 2026",
            days: 2,
            status: "Pending"
        },
        {
            id: 2,
            leaveType: "Sick Leave",
            startDate: "10 Nov 2026",
            endDate: "10 Nov 2026",
            days: 1,
            status: "Approved"
        },
        {
            id: 3,
            leaveType: "Earned Leave",
            startDate: "05 Oct 2026",
            endDate: "06 Oct 2026",
            days: 2,
            status: "Rejected"
        }
    ];

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

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">

            <div className="max-w-6xl mx-auto flex flex-col gap-8">

                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        LeaveManager
                    </h2>

                    <h1 className="text-3xl font-bold text-gray-900 mt-6">
                        Welcome Back! 
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Here's an overview of your leave activity.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Total Leave Balance
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-3">
                            10
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Days Remaining
                        </p>
                    </div>

                    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Pending Requests
                        </p>
                        <p className="text-3xl font-bold text-yellow-600 mt-3">
                            2
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Awaiting Approval
                        </p>
                    </div>

                    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Approved Leaves
                        </p>
                        <p className="text-3xl font-bold text-green-600 mt-3">
                            5
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            This Year
                        </p>
                    </div>

                    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Rejected Requests
                        </p>
                        <p className="text-3xl font-bold text-red-600 mt-3">
                            1
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            This Year
                        </p>
                    </div>

                </div>

                {/* Apply for Leave Button */}
                <div className="flex justify-end">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
                    >
                        + Apply for Leave
                    </button>
                </div>

                {/* Recent Leave Requests */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Recent Leave Requests
                        </h2>

                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b border-gray-200 text-sm text-gray-500">
                                    <th className="py-3 px-4">Leave Type</th>
                                    <th className="py-3 px-4">Start Date</th>
                                    <th className="py-3 px-4">End Date</th>
                                    <th className="py-3 px-4">Days</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {leaveRequests.map((request) => (
                                    <tr
                                        key={request.id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="py-4 px-4 font-medium text-gray-800">
                                            {request.leaveType}
                                        </td>

                                        <td className="py-4 px-4 text-gray-600">
                                            {request.startDate}
                                        </td>

                                        <td className="py-4 px-4 text-gray-600">
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
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}
