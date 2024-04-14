import { Hono } from "hono";
import {
  getUserDetails,
  getUserListing,
  updateUserProfile,
} from "../controllers/user.controller";
import { getCookieInfo } from "../middleware/getCookieInfo";
import { ZodValidator } from "../helper/validator";
import { updateSchema } from "../schema";
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
  ZodValidator(updateSchema),
  updateUserProfile
);

export default UserRoute;
