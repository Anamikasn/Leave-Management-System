import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function LoginForm() {
    const {
        loginWithRedirect,
        getAccessTokenSilently,
        isLoading,
        isAuthenticated
    } = useAuth0();

    useEffect(() => {
        async function getToken() {
            try {
                const token = await getAccessTokenSilently();
                console.log("Access token:", token);
            } catch (error) {
                console.error("Failed to get access token:", error);
            }
        }

        if (isAuthenticated) {
            getToken();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
                    LeaveManager
                </h1>

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Welcome Back!
                </h2>

                <button
                    type="button"
                    // onClick={() => loginWithRedirect()}
                    onClick={() => {
    console.log("Login button clicked");
    loginWithRedirect();
}}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>

                <p className="text-center text-gray-400 text-sm mt-6">
                    LeaveManager · Leave Management System
                </p>
            </div>
        </div>
    );
}
