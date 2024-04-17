import { Hono } from "hono";
import { signup, Login } from "../controllers/auth.controller";
import { ZodValidator } from "../helper/validator";
import { getCookieInfo } from "../middleware/getCookieInfo";
import { deleteCookie } from "hono/cookie";
import { loginSchema, signUpSchema } from "../schema";

const AuthRoute = new Hono().basePath("/");

AuthRoute.post("signup", ZodValidator(signUpSchema, "json"), signup);
AuthRoute.post("login", ZodValidator(loginSchema, "json"), Login);
AuthRoute.post("logout", getCookieInfo, (c) => {
  try {
    deleteCookie(c, "real-estate-auth-token");
    return c.text("User logged out successfully");
  } catch (error) {
    return c.text("Error while logged out");
  }
});
export default AuthRoute;
