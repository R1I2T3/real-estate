import { Outlet, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("real-estate-user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <Card className="w-[300px] sm:w-[500px] ">
        <Outlet />
      </Card>
    </main>
  );
};

export default AuthLayout;
