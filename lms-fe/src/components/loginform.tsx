import { useAuth0 } from "@auth0/auth0-react";

export default function LoginForm() {

    const { loginWithRedirect, isLoading } = useAuth0();

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
                    LeaveManager
                </h1>

                {/* <p className="text-gray-500 text-center mb-8">
                    Your leave management, made simple.
                </p> */}

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Welcome Back!
                </h2>

                {/* <p className="text-gray-500 text-center m-6">
                    Login to access your LeaveEase account.
                </p> */}

                <button
                    type="button"
                    onClick={() => loginWithRedirect()}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>

                <p className="text-center text-gray-400 text-sm mt-6">
                    LeaveEase · Leave Management System
                </p>

            </div>
        </div>
    );
}
