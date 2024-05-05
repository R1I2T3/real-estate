import Header from "@/components/protected/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProtectedLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserIsAuthenticated = async () => {
      try {
        const response = await (await fetch("/api")).json();
        if (response.error === "Unauthorized request") {
          localStorage.removeItem("real-estate-user");
          navigate("/auth/login", {
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserIsAuthenticated();
  }, [navigate]);
  return (
    <main className="mb-10">
      <Header />
      <Outlet />
    </main>
  );
};

export default ProtectedLayout;
