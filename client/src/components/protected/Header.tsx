import { AuthContext } from "@/context/userContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LogOutButton } from "./LogOutButton";
import MobileViewHeader from "./MobileViewHeader";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex h-[5dvh] justify-between items-center p-10 bg-slate-200">
      <h1 className="text-orange-700 font-semibold text-italic text-2xl italic">
        Restate
      </h1>
      <nav className="gap-6 items-center hidden md:flex">
        <NavLink
          to={"/"}
          className={
            "font-light font-serif text-lg hover:text-blue-800 hover:underline"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/createlisting"}
          className={
            "font-light font-serif text-lg  hover:text-blue-800 hover:underline"
          }
        >
          Create Listing
        </NavLink>
        <NavLink
          to={`/getprofile/${user?.id}`}
          className={
            "font-light font-serif text-lg  hover:text-blue-800 hover:underline"
          }
        >
          Profile
        </NavLink>
        <LogOutButton />
      </nav>
      <nav className="block md:hidden">
        <MobileViewHeader id={user?.id} />
      </nav>
    </div>
  );
};

export default Header;
