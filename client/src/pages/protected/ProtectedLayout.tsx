import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default ProtectedLayout;
