import { Hono } from "hono";
import {
  createListing,
  getListingById,
} from "../controllers/listing.controller";
import { ZodValidator } from "../helper/validator";
import { createListingSchema } from "../schema";
import { getCookieInfo } from "../middleware/getCookieInfo";
const ListingRoute = new Hono().basePath("");

ListingRoute.post(
  "/create",
  getCookieInfo,
  ZodValidator(createListingSchema, "form"),
  createListing
);

ListingRoute.get("/getlisting/:id", getCookieInfo, getListingById);
export default ListingRoute;
