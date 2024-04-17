import { Context } from "hono";
import db from "../config/db";
import { UploadFileToCloudinary } from "../helper/UploadFileToCloudinary";
import { v2 as cloudinary } from "cloudinary";
export const createListing = async (c: Context) => {
  try {
    const parsedData = c.get("parsedData");
    const userID = c.get("user").id;
    const { image } = await c.req.parseBody();
    let image_url;
    if (image && image instanceof File) {
      image_url = await UploadFileToCloudinary(image, c);
    }
    const newListing = await db.listing.create({
      data: {
        ...parsedData,
        imageUrl: image_url,
        userID,
      },
    });
    return c.json(newListing, 201);
  } catch (error: any) {
    console.log(error.message);
    return c.text("Failed to create user listing", 500);
  }
};

export const getListingById = async (c: Context) => {
  try {
    const listingId = c.req.param("id");
    const Listing = await db.listing.findUnique({ where: { id: listingId } });
    if (!Listing) {
      return c.text("Wrong listing is provided", 500);
    }
    return c.json(Listing, 200);
  } catch (error) {
    console.log(error);
    return c.text("Internal server error", 500);
  }
};

export const deleteListing = async (c: Context) => {
  try {
    const listingId = c.req.param("id");
    await db.listing.delete({ where: { id: listingId } });
    return c.text("Listing deleted successfully", 204);
  } catch (error: any) {
    console.log(error.message);
    return c.text("Internal server error", 500);
  }
};

export const updateListing = async (c: Context) => {
  try {
    const { image } = await c.req.parseBody();
    const ListingId = c.req.param("id");
    const parsedBody = c.get("parsedData");
    const currentListing = await db.listing.findUnique({
      where: { id: ListingId },
    });
    let new_image_url = "";
    if (image && image instanceof File) {
      await cloudinary.uploader.destroy(
        currentListing?.imageUrl.split("/").pop()?.split(".")[0] as string
      );
      new_image_url = await UploadFileToCloudinary(image, c);
    }
    const updatedListing = await db.listing.update({
      where: { id: ListingId },
      data: {
        ...parsedBody,
        imageUrl: new_image_url || currentListing?.imageUrl,
      },
    });
    return c.json(
      { data: updatedListing, message: "Listing Updated successfully" },
      204
    );
  } catch (error: any) {
    console.log(error.message);
    return c.text("Internal server error", 500);
  }
};
