import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
const AuthLayout = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <Card className="w-[300px] sm:w-[500px] ">
        <Outlet />
      </Card>
    </main>
  );
};

export default AuthLayout;
