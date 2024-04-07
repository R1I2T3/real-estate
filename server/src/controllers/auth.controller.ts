import db from "../config/db";
import { createTokenAndSetCookie } from "../helper/createTokenAndSetCookie";
export const signup = async (c: any) => {
  try {
    const { username, email, password } = await c.req.json();
    const isUserPresent = await db.user.findUnique({
      where: { email },
    });
    if (isUserPresent) {
      return c.text("Email is already in used", 400);
    }
    const hashPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });
    if (!newUser) {
      return c.text("Some error take place while registering account", 500);
    }
    await createTokenAndSetCookie(c, newUser.id);
    return c.json(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      201
    );
  } catch (error: any) {
    console.log(error.message);
    return c.text("Some error taken place on server", 500);
  }
};

export const Login = async (c: any) => {
  try {
    const { email, password } = await c.req.json();
    const currentUser = await db.user.findUnique({ where: { email } });
    if (!currentUser) {
      return c.text("Invalid credentials", 401);
    }
    const isPasswordCorrect = await Bun.password.verify(
      password,
      currentUser.password
    );
    if (!isPasswordCorrect) {
      return c.text("Invalid credentials", 401);
    }
    await createTokenAndSetCookie(c, currentUser.id);
    return c.json(
      {
        id: currentUser.id,
        email: currentUser.email,
        imageUrl: currentUser.avatar,
      },
      200
    );
  } catch (error: any) {
    console.log(error.message);
    return c.text("Some error taken place on server", 500);
  }
};
