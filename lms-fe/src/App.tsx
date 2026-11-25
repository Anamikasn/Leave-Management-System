import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import LoginForm from "./components/loginform";
import UserDashboard from "./pages/userdashboard";
import AdminDashboard from "./pages/admindashboard";

function App() {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    logout
  } = useAuth0();

  const [employee, setEmployee] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setEmployee(null);
      setProfileLoading(false);
      return;
    }

    const fetchEmployeeProfile = async () => {
      try {
        setProfileLoading(true);
        setError("");

        const token = await getAccessTokenSilently();

        const response = await fetch(
          "http://localhost:4000/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch employee profile");
        }

        const data = await response.json();

        // Supports either { employee: {...} } or a direct profile response
        const profile = data.employee ?? data.user ?? data;

       

console.log("Backend profile response:", data);



console.log("Logged-in employee role:", profile.role);
console.log("Logged-in employee:", profile.email);

        if (!profile.role) {
          throw new Error("Employee role was not returned by the backend");
        }

        setEmployee(profile);
      } catch (err) {
        console.error("Error fetching employee profile:", err);
        setError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchEmployeeProfile();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading || (isAuthenticated && profileLoading)) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin
              }
            })
          }
        >
          Log out
        </button>
      </div>
    );
  }

  if (employee?.role === "ADMIN") {
    return <AdminDashboard />;
  }

  if (employee?.role === "EMPLOYEE") {
    return <UserDashboard />;
  }

  return <p>Unknown employee role.</p>;
}

export default App;
