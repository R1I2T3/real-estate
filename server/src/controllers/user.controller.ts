import db from "../config/db";
import { Context } from "hono";
import { v2 as cloudinary } from "cloudinary";
import { UploadFileToCloudinary } from "../helper/UploadFileToCloudinary";

export const getUserDetails = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json({ user, success: true }, 200);
  } catch (error: any) {
    console.log(error.message);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateUserProfile = async (c: Context) => {
  try {
    const id = c.get("user").id;
    const currentInfo = await db.user.findUnique({ where: { id } });
    let avatarUrl = "";
    if (!currentInfo || id !== currentInfo.id) {
      return c.json(
        { error: "You are not authorized to perform this action" },
        401
      );
    }
    const { avatar } = await c.req.parseBody();
    const { username, password } = c.get("parsedData");
    if (avatar && avatar instanceof File) {
      if (currentInfo.avatar) {
        await cloudinary.uploader.destroy(
          currentInfo.avatar.split("/").pop()?.split(".")[0] as string
        );
      }
      avatarUrl = await UploadFileToCloudinary(avatar, c);
    }
    let newHashedPassword;
    if (password) {
      newHashedPassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
      });
    }
    const newData = await db.user.update({
      where: { id },
      data: {
        username: username || currentInfo.username,
        password: newHashedPassword || currentInfo.password,
        avatar: avatarUrl || currentInfo.avatar,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });
    return c.json(
      {
        message: "Your Profile Updated Successfully",
        data: {
          id: newData.id,
          email: newData.email,
          imageUrl: newData.avatar,
        },
      },
      202
    );
  } catch (error: any) {
    console.log(error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const getUserListing = async (c: Context) => {
  try {
    const { id, skip: skipqueryparam } = c.req.query();
    const skip = parseInt(skipqueryparam, 10);
    const Listings = await db.listing.findMany({
      where: { userID: id },
      skip: skip * 6,
    });
    if (Listings.length === 0) {
      return c.json({ error: "There is no user listing" }, 200);
    }
    return c.json({ Listings }, 200);
  } catch (error: any) {
    console.log(error.message);
    return c.json(
      { error: "Failed to get User listing due to some error" },
      500
    );
  }
};
