import { Context } from "hono";
import db from "../config/db";
export const createListing = async (c: Context) => {
  try {
    const userID = c.get("user").id;
    const data = await c.req.json();
    const newListing = await db.listing.create({
      data: { ...data, userID },
    });
    return c.json(newListing);
  } catch (error: any) {
    console.log(error.message);
    return c.text("Failed to create user listing", 500);
  }
};
