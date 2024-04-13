import { Hono } from "hono";
import {
  getUserDetails,
  getUserListing,
  updateUserProfile,
} from "../controllers/user.controller";
import { getCookieInfo } from "../middleware/getCookieInfo";
import { updateProfileValidator } from "../helper/validator";
const UserRoute = new Hono().basePath("");

UserRoute.get("/a", (c) => {
  console.log("I am here");
  return c.text("It work fine");
});

UserRoute.get("/getlisting", getCookieInfo, getUserListing);
UserRoute.get("/:id", getCookieInfo, getUserDetails);
UserRoute.put(
  "/update",
  getCookieInfo,
  updateProfileValidator,
  updateUserProfile
);

export default UserRoute;
