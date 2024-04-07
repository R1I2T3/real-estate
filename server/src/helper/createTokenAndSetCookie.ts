import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
export const createTokenAndSetCookie = async (c: any, id: string) => {
  const token = await sign(
    { id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWT_SECRET as string
  );

  await setCookie(c, "real-estate-auth-token", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 60 * 60 * 24,
  });
};
