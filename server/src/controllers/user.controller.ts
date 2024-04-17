import db from "../config/db";
import { Context } from "hono";
import { v2 as cloudinary } from "cloudinary";

export const getUserDetails = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await db.user.findUnique({
      where: { id },
      select: { username: true, email: true, avatar: true, createdAt: true },
    });
    if (!user) {
      return c.text("User not found");
    }
    return c.json({ user, success: true }, 200);
  } catch (error: any) {
    console.log(error.message);
    return c.text("Internal server error", 500);
  }
};

export const updateUserProfile = async (c: Context) => {
  try {
    const id = c.get("user").id;
    const currentInfo = await db.user.findUnique({ where: { id } });
    let avatarUrl = "";
    if (!currentInfo || id !== currentInfo.id) {
      return c.text("You are not authorized to perform this action", 401);
    }
    const { username, password, avatar } = await c.req.json();
    if (avatar) {
      if (currentInfo.avatar) {
        await cloudinary.uploader.upload(
          currentInfo.avatar.split("/").pop()?.split(".")[0] as string
        );
      }
      avatarUrl = (await cloudinary.uploader.upload(avatar as string))
        .secure_url;
    }
    let newHashedPassword;
    if (password) {
      newHashedPassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
      });
    }
    await db.user.update({
      where: { id },
      data: {
        username: username || currentInfo.username,
        password: newHashedPassword || currentInfo.password,
        avatar: avatarUrl || currentInfo.avatar,
      },
    });
    return c.text("Your Profile Updated Successfully");
  } catch (error: any) {
    console.log(error);
    return c.text("Internal server error", 500);
  }
};

export const getUserListing = async (c: Context) => {
  try {
    const userID = c.get("user").id;
    const userListing = await db.listing.findMany({ where: { userID } });
    if (!userListing.length) {
      return c.text("There is no user listing", 200);
    }
    return c.json(userListing);
  } catch (error: any) {
    console.log(error.message);
    return c.text("Failed to get User listing due to some error", 500);
  }
};