import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { unlink } from "node:fs/promises";
import { Context } from "hono";
export const UploadFileToCloudinary = async (file: File, c: Context) => {
  const imageProperty = file.name.split(".");
  const path = `${process.env.TEMP_IMAGE_PATH}/${imageProperty[0]}${uuid()}.${
    imageProperty[1]
  }`;
  try {
    await Bun.write(path, Buffer.from(await file.arrayBuffer()));
    const response = await cloudinary.uploader.upload(path);
    return response.secure_url;
  } catch (error) {
    // return c.text("Failed to upload file", 500);
    throw new Error("Failed to upload file");
  } finally {
    await unlink(path);
  }
};
