import { Hono } from "hono";
import { signup, Login } from "../controllers/auth.controller";
import { signUpValidator, LoginValidator } from "../helper/validator";
import { getCookieInfo } from "../helper/getCookieInfo";
const AuthRoute = new Hono().basePath("/auth");
import { deleteCookie } from "hono/cookie";

AuthRoute.get("/", (c) => {
  return c.text("Hello hono");
});

AuthRoute.post("/signup", signUpValidator, signup);
AuthRoute.post("/login", LoginValidator, Login);
AuthRoute.post("/logout", getCookieInfo, (c) => {
  try {
    deleteCookie(c, "real-estate-auth-token");
    return c.text("User logged out successfully");
  } catch (error) {
    return c.text("Error while logged out");
  }
});
export default AuthRoute;
