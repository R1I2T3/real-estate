import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signup";
import AuthLayout from "@/pages/auth/AuthLayout";
import ProtectedLayout from "@/pages/protected/ProtectedLayout";
import Home from "@/pages/protected/Home";
import { Toaster } from "@/components/ui/sonner";
import CreateListing from "./pages/protected/CreateListing";
import UpdateListing from "./pages/protected/UpdateListing";
import GetListingFromId from "./pages/protected/GetListingFromId";
import GetProfile from "./pages/protected/GetProfile";
import GetUserListing from "./pages/protected/GetUserListing";
import UpdateProfile from "./pages/protected/UpdateProfile";
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
          <Route path="/updatelisting/:id" element={<UpdateListing />} />
          <Route path="/getlisting/:id" element={<GetListingFromId />} />
          <Route path="/getprofile/:id" element={<GetProfile />} />
          <Route path="/getuserlisting/:id" element={<GetUserListing />} />
          <Route path="/updateprofile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  );
};

export default App;
