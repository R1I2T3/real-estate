import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signup";
import AuthLayout from "@/pages/auth/AuthLayout";
import ProtectedLayout from "@/pages/protected/ProtectedLayout";
import Home from "@/pages/protected/Home";
import { Toaster } from "@/components/ui/toaster";
import CreateListing from "./pages/protected/CreateListing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/createlisting" element={<CreateListing />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;