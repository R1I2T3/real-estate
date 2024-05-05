import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOutButton } from "./LogOutButton";
const MobileViewHeader = ({ id }: { id: string }) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <label>&#9776;</label>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerFooter>
          <DrawerFooter>
            <DrawerClose asChild>
              <NavLink
                to={"/"}
                className={
                  "bg-slate-200 font-light text-lg p-3 rounded-lg hover:text-blue-700 hover:underline"
                }
              >
                Home
              </NavLink>
            </DrawerClose>
            <DrawerClose asChild>
              <NavLink
                to={"/createListing"}
                className={
                  "bg-slate-200 font-light text-lg p-3 rounded-lg hover:text-blue-700 hover:underline"
                }
              >
                Create Listing
              </NavLink>
            </DrawerClose>
            <DrawerClose asChild>
              <NavLink
                to={`/getprofile/${id}`}
                className={
                  "bg-slate-200 font-light text-lg p-3 rounded-lg hover:text-blue-700 hover:underline"
                }
              >
                Profile
              </NavLink>
            </DrawerClose>
            <DrawerClose asChild>
              <LogOutButton />
            </DrawerClose>
          </DrawerFooter>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileViewHeader;
