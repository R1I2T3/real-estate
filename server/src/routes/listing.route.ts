import { Hono } from "hono";
import {
  createListing,
  deleteListing,
  getListingById,
  getListingByType,
  updateListing,
} from "../controllers/listing.controller";
import { ZodValidator } from "../helper/validator";
import { createListingSchema, updateListingSchema } from "../schema";
import { getCookieInfo } from "../middleware/getCookieInfo";
const ListingRoute = new Hono().basePath("");

ListingRoute.post(
  "/create",
  getCookieInfo,
  ZodValidator(createListingSchema, "form"),
  createListing
);
ListingRoute.get("/getlisting/:id", getCookieInfo, getListingById);
ListingRoute.delete("/delete/:id", getCookieInfo, deleteListing);
ListingRoute.put(
  "/update/:id",
  getCookieInfo,
  ZodValidator(updateListingSchema, "form"),
  updateListing
);
ListingRoute.get("/getlisting", getCookieInfo, getListingByType);
export default ListingRoute;
