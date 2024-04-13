import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import db from "../config/db";
export const getCookieInfo = async (c: any, next: any) => {
  try {
    const cookie = getCookie(c, "real-estate-auth-token");
    if (!cookie) {
      return c.text("Unauthorized request", 401);
    }
    const decode = await verify(cookie, process.env.JWT_SECRET as string);
    if (!decode) {
      return c.text("Unauthorized request", 401);
    }
    const user = await db.user.findUnique({ where: { id: decode.id } });
    if (!user) {
      return c.text("Unauthorized request", 401);
    }
    c.set("user", user);
    await next();
  } catch (error) {
    return c.text("Some Server side error taken place", 500);
  }
};
