// import { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { apiRequest } from "../services/api";

// export default function UserDashboard() {
//   const { logout, getAccessTokenSilently } = useAuth0();

  

//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [leaveBalances, setLeaveBalances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [leaveTypeId, setLeaveTypeId] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [reason, setReason] = useState("");


//   useEffect(() => {
//     let cancelled = false;

//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [requestsData, balancesData] = await Promise.all([
//           apiRequest(getAccessTokenSilently, "/api/leave-requests/me"),
//           apiRequest(getAccessTokenSilently, "/api/leave-balances/me"),
//         ]);

//         if (!cancelled) {
//           setLeaveRequests(requestsData.leaveRequests || []);
//           setLeaveBalances(balancesData.balances || []);
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);

//         if (!cancelled) {
//           setError(err.message || "Failed to load dashboard data");
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };



//     fetchDashboardData();

//     return () => {
//       cancelled = true;
//     };
//   }, [getAccessTokenSilently]);

//   // Calculate total remaining leave days
//   const totalLeaveBalance = leaveBalances.reduce(
//     (total, balance) =>
//       total +
//       Number(balance.days_remaining ?? balance.days_total - balance.days_used),
//     0,
//   );

//   const handleCreateLeaveRequest = async (e) => {
//   e.preventDefault();

//   if (!leaveTypeId || !startDate || !endDate || !reason.trim()) {
//     alert("Please fill in all the fields.");
//     return;
//   }

//   try {
//     setIsSubmitting(true);

//     const response = await apiRequest(
//       getAccessTokenSilently,
//       "/api/leave-requests/me",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           leave_id: Number(leaveTypeId),
//           start_date: startDate,
//           end_date: endDate,
//           reason: reason.trim(),
//         }),
//       }
//     );

//     console.log("Leave request created:", response);

//     // Fetch the latest requests from the database
//     await fetchLeaveRequests();

//     // Clear the form
//     setLeaveTypeId("");
//     setStartDate("");
//     setEndDate("");
//     setReason("");

//     alert("Leave request submitted successfully!");
//   } catch (error) {
//     console.error("Error creating leave request:", error);
//     alert("Failed to submit leave request. Please try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const currentYear = new Date().getFullYear();

//   const currentYearRequests = leaveRequests.filter((request) => {
//     return new Date(request.start_date).getFullYear() === currentYear;
//   });

//   const pendingRequests = currentYearRequests.filter(
//     (request) => request.status === "PENDING",
//   ).length;

//   const approvedLeaveDays = currentYearRequests
//     .filter((request) => request.status === "APPROVED")
//     .reduce((total, request) => total + Number(request.total_days), 0);

//   const rejectedRequests = currentYearRequests.filter(
//     (request) => request.status === "REJECTED",
//   ).length;

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";
//       case "APPROVED":
//         return "bg-green-100 text-green-700";
//       case "REJECTED":
//         return "bg-red-100 text-red-700";
//       case "CANCELLED":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const fetchLeaveRequests = async () => {
//   try {
//     const data = await apiRequest(
//       getAccessTokenSilently,
//       "/api/leave-requests/me",
//       {
//         method: "GET",
//       }
//     );

//     console.log("My leave requests:", data);

//     const requests = Array.isArray(data)
//       ? data
//       : data.leaveRequests ?? [];

//     const formattedRequests = requests.map((request) => ({
//       id: request.id,
//       leaveType: request.leaveType?.leave_name ?? "Unknown",
//       startDate: request.start_date
//         ? new Date(request.start_date).toLocaleDateString("en-GB")
//         : "N/A",
//       endDate: request.end_date
//         ? new Date(request.end_date).toLocaleDateString("en-GB")
//         : "N/A",
//       days: request.total_days,
//       status:
//         request.status?.charAt(0) +
//         request.status?.slice(1).toLowerCase(),
//       reason: request.reason,
//     }));

//     setLeaveRequests(formattedRequests);
//   } catch (error) {
//     console.error("Error fetching my leave requests:", error);
//   }
// };

// useEffect(() => {
//   fetchLeaveRequests();
// }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";

//     // Avoid timezone shifts for MySQL DATE values
//     const [year, month, day] = dateString.slice(0, 10).split("-");

//     return new Date(
//       Number(year),
//       Number(month) - 1,
//       Number(day),
//     ).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-500">Loading your dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 md:p-10">
//       <div className="max-w-6xl mx-auto flex flex-col gap-8">
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">LeaveManager</h2>

//             <h1 className="text-3xl font-bold text-gray-900 mt-4">
//               Welcome Back, Employee!
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Here's an overview of your leave activity.
//             </p>
//           </div>

//           <button
//             onClick={() =>
//               logout({
//                 logoutParams: {
//                   returnTo: window.location.origin,
//                 },
//               })
//             }
//             className="self-start sm:self-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
//           >
//             Logout
//           </button>
//         </header>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
//             <p className="text-sm text-gray-500">Total Leave Balance</p>
//             <p className="text-3xl font-bold text-gray-800 mt-3">
//               {totalLeaveBalance}
//             </p>
//             <p className="text-sm text-gray-400 mt-1">Days Remaining</p>
//           </div>

//           <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
//             <p className="text-sm text-gray-500">Pending Requests</p>
//             <p className="text-3xl font-bold text-yellow-600 mt-3">
//               {pendingRequests}
//             </p>
//             <p className="text-sm text-gray-400 mt-1">Awaiting Approval</p>
//           </div>

//           <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
//             <p className="text-sm text-gray-500">Approved Leave Days</p>
//             <p className="text-3xl font-bold text-green-600 mt-3">
//               {approvedLeaveDays}
//             </p>
//             <p className="text-sm text-gray-400 mt-1">This Year</p>
//           </div>

//           <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
//             <p className="text-sm text-gray-500">Rejected Requests</p>
//             <p className="text-3xl font-bold text-red-600 mt-3">
//               {rejectedRequests}
//             </p>
//             <p className="text-sm text-gray-400 mt-1">This Year</p>
//           </div>
//         </div>

//         {/* Apply for Leave Button */}
//         <div className="flex justify-end">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition">
//             + Apply for Leave
//           </button>
//         </div>

//         {/* Recent Leave Requests */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Recent Leave Requests
//             </h2>

//             <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//               View All
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-gray-200 text-sm text-gray-500">
//                   <th className="py-3 px-4">Leave Type</th>
//                   <th className="py-3 px-4">Start Date</th>
//                   <th className="py-3 px-4">End Date</th>
//                   <th className="py-3 px-4">Days</th>
//                   <th className="py-3 px-4">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {leaveRequests.map((request) => (
//                   <tr
//                     key={request.id}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="py-4 px-4 font-medium text-gray-800">
//                       {request.leaveType?.leave_name || "Leave"}
//                     </td>

//                     <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
//                       {formatDate(request.start_date)}
//                     </td>

//                     <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
//                       {formatDate(request.end_date)}
//                     </td>

//                     <td className="py-4 px-4 text-gray-600">
//                       {request.total_days}
//                     </td>

//                     <td className="py-4 px-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(request.status)}`}
//                       >
//                         {request.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {leaveRequests.length === 0 && (
//               <p className="text-center text-gray-500 py-8">
//                 You haven't submitted any leave requests yet.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiRequest } from "../services/api";

type LeaveType = {
  id: number;
  leave_name: string;
  name?: string;
  description?: string | null;
  default_days?: number;
  is_paid?: boolean;
};

type LeaveBalance = {
  days_remaining?: number;
  days_total: number;
  days_used: number;
  leavetype?: LeaveType;
  leaveType?: LeaveType;
  leave_type?: LeaveType;
};

type LeaveRequest = {
  id: number;
  leaveType?: LeaveType;
  start_date: string;
  end_date: string;
  total_days: number;
  status: string;
};

export default function UserDashboard() {
  const { logout, getAccessTokenSilently } = useAuth0();

  

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [isLoadingLeaveTypes, setIsLoadingLeaveTypes] = useState(true);
  const [leaveTypesError, setLeaveTypesError] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [modalError, setModalError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const getAccessToken = useCallback(async (): Promise<string> => {
    const token = await getAccessTokenSilently();
    if (!token) {
      throw new Error("Unable to retrieve an access token");
    }
    return token;
  }, [getAccessTokenSilently]);

  const loadDashboardData = async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
        setError("");
      }

      const [requestsData, balancesData] = await Promise.all([
        apiRequest(getAccessToken, "/api/leave-requests/me"),
        apiRequest(getAccessToken, "/api/leave-balances/me"),
      ]);

      const requests: LeaveRequest[] = Array.isArray(requestsData)
        ? requestsData
        : requestsData.leaveRequests ?? [];

      const balances: LeaveBalance[] = Array.isArray(balancesData)
        ? balancesData
        : balancesData.balances ?? [];

      setLeaveRequests(requests);
      setLeaveBalances(balances);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      if (showLoader) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard data"
        );
      }
      throw err;
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadDashboardData(true).catch(() => {});
  }, [getAccessTokenSilently]);

  useEffect(() => {
    let cancelled = false;

    const loadLeaveTypes = async () => {
      setIsLoadingLeaveTypes(true);
      setLeaveTypesError("");

      try {
        const response = await apiRequest(getAccessToken, "/api/leave-types");
        if (!Array.isArray(response.leaveTypes)) {
          throw new Error("The leave types response is invalid.");
        }
        if (!cancelled) {
          setLeaveTypes(response.leaveTypes);
        }
      } catch (err) {
        console.error("Error fetching leave types:", err);
        if (!cancelled) {
          setLeaveTypes([]);
          setLeaveTypesError(
            err instanceof Error ? err.message : "Failed to load leave types."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingLeaveTypes(false);
        }
      }
    };

    loadLeaveTypes();

    return () => {
      cancelled = true;
    };
  }, [getAccessToken]);

  // Calculate total remaining leave days
  const totalLeaveBalance = leaveBalances.reduce(
    (total, balance) =>
      total +
      Number(balance.days_remaining ?? balance.days_total - balance.days_used),
    0,
  );

  const handleCreateLeaveRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalError("");

    if (!leaveTypeId || !startDate || !endDate || !reason.trim()) {
      setModalError("Please complete all fields.");
      return;
    }

    if (endDate < startDate) {
      setModalError("End date cannot be earlier than start date.");
      return;
    }

    try {
      setIsSubmitting(true);

      await apiRequest(
        getAccessToken,
        "/api/leave-requests/me",
        {
          method: "POST",
          body: JSON.stringify({
            leave_id: Number(leaveTypeId),
            start_date: startDate,
            end_date: endDate,
            reason: reason.trim(),
          }),
        }
      );

      await loadDashboardData(false);

      setLeaveTypeId("");
      setStartDate("");
      setEndDate("");
      setReason("");
      setShowLeaveModal(false);
      setModalError("");
    } catch (err) {
      console.error("Error creating leave request:", err);
      setModalError(
        err instanceof Error
          ? err.message
          : "Failed to submit leave request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const currentYearRequests = leaveRequests.filter((request) => {
    return new Date(request.start_date).getFullYear() === currentYear;
  });

  const pendingRequests = currentYearRequests.filter(
    (request) => request.status === "PENDING",
  ).length;

  const approvedLeaveDays = currentYearRequests
    .filter((request) => request.status === "APPROVED")
    .reduce((total, request) => total + Number(request.total_days), 0);

  const rejectedRequests = currentYearRequests.filter(
    (request) => request.status === "REJECTED",
  ).length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "CANCELLED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";

    // Avoid timezone shifts for MySQL DATE values
    const [year, month, day] = dateString.slice(0, 10).split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">LeaveManager</h2>

            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Welcome Back, Employee!
            </h1>

            <p className="text-gray-500 mt-2">
              Here's an overview of your leave activity.
            </p>
          </div>

          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
            className="self-start sm:self-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Total Leave Balance</p>
            <p className="text-3xl font-bold text-gray-800 mt-3">
              {totalLeaveBalance}
            </p>
            <p className="text-sm text-gray-400 mt-1">Days Remaining</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="text-3xl font-bold text-yellow-600 mt-3">
              {pendingRequests}
            </p>
            <p className="text-sm text-gray-400 mt-1">Awaiting Approval</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Approved Leave Days</p>
            <p className="text-3xl font-bold text-green-600 mt-3">
              {approvedLeaveDays}
            </p>
            <p className="text-sm text-gray-400 mt-1">This Year</p>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Rejected Requests</p>
            <p className="text-3xl font-bold text-red-600 mt-3">
              {rejectedRequests}
            </p>
            <p className="text-sm text-gray-400 mt-1">This Year</p>
          </div>
        </div>

        {/* Apply for Leave Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setModalError("");
              setShowLeaveModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            + Apply for Leave
          </button>
        </div>

        {/* Create Leave Request Modal */}
        {showLeaveModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowLeaveModal(false);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-leave-title"
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2
                  id="create-leave-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  Create Leave Request
                </h2>
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  aria-label="Close modal"
                  className="rounded-lg px-2 py-1 text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleCreateLeaveRequest} className="space-y-4">
                <div>
                  <label
                    htmlFor="leave-type"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Leave Type
                  </label>
                  <select
                    id="leave-type"
                    value={leaveTypeId}
                    onChange={(event) => setLeaveTypeId(event.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      {isLoadingLeaveTypes
                        ? "Loading leave types..."
                        : "Select leave type"}
                    </option>
                    {leaveTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.leave_name}
                      </option>
                    ))}
                  </select>
                  {leaveTypesError && (
                    <p role="alert" className="mt-1 text-xs text-red-600">
                      {leaveTypesError}
                    </p>
                  )}
                  {!isLoadingLeaveTypes && !leaveTypesError && leaveTypes.length === 0 && (
                    <p className="mt-1 text-xs text-amber-600">
                      No leave types are currently available.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="leave-start-date"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      id="leave-start-date"
                      type="date"
                      value={startDate}
                      min={getTodayDate()}
                      onChange={(event) => {
                        setStartDate(event.target.value);
                        if (endDate && event.target.value > endDate) {
                          setEndDate("");
                        }
                      }}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="leave-end-date"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      End Date
                    </label>
                    <input
                      id="leave-end-date"
                      type="date"
                      value={endDate}
                      min={startDate || getTodayDate()}
                      onChange={(event) => setEndDate(event.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="leave-reason"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Reason for Leave
                  </label>
                  <textarea
                    id="leave-reason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    rows={4}
                    required
                    maxLength={1000}
                    placeholder="Briefly explain why you need leave"
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {modalError && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {modalError}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowLeaveModal(false)}
                    disabled={isSubmitting}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      isLoadingLeaveTypes ||
                      Boolean(leaveTypesError) ||
                      leaveTypes.length === 0
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                      {request.leaveType?.leave_name || "Leave"}
                    </td>

                    <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                      {formatDate(request.start_date)}
                    </td>

                    <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                      {formatDate(request.end_date)}
                    </td>

                    <td className="py-4 px-4 text-gray-600">
                      {request.total_days}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(request.status)}`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leaveRequests.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                You haven't submitted any leave requests yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
