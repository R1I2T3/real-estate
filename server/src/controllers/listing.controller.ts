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
    return c.json({ error: "Failed to create user listing" }, 500);
  }
};

export const getListingById = async (c: Context) => {
  try {
    const listingId = c.req.param("id");
    const Listing = await db.listing.findUnique({ where: { id: listingId } });
    if (!Listing) {
      return c.json({ error: "Wrong listing is provided" }, 500);
    }
    return c.json(Listing, 200);
  } catch (error) {
    console.log(error);
    return c.json(
      { error: "Internal server error while getting listing" },
      500
    );
  }
};

export const deleteListing = async (c: Context) => {
  try {
    const listingId = c.req.param("id");
    const userID = c.get("user").id;
    const currentListing = await db.listing.findUnique({
      where: { id: listingId },
      select: { userID: true, imageUrl: true },
    });
    if (!currentListing) {
      return c.json({ error: "This Listing does not exists" }, 404);
    }
    if (userID !== currentListing.userID) {
      return c.json(
        { error: "You are not authorized to perform such action" },
        401
      );
    }
    await cloudinary.uploader.destroy(
      currentListing?.imageUrl.split("/").pop()?.split(".")[0] as string
    );
    await db.listing.delete({ where: { id: listingId } });
    return c.json({ error: "Listing deleted successfully" }, 204);
  } catch (error: any) {
    console.log(error.message);
    return c.json(
      { error: "Internal server error while deleting listing" },
      500
    );
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
    return c.text("Internal server error while updating listing", 500);
  }
};

export const getListingByType = async (c: Context) => {
  try {
    const { q } = c.req.query();
    const Listings = await db.listing.findMany({ where: { type: q } });
    if (Listings.length === 0) {
      return c.text("There is no Listing with this type", 404);
    }
    return c.json({ Listings }, 200);
  } catch (error: any) {
    console.log(error.message);
    return c.text("Failed to getListing By Type", 500);
  }
};
