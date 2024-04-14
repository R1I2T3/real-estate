import { Hono } from "hono";
import { createListing } from "../controllers/listing.controller";
import { ZodValidator } from "../helper/validator";
import { createListingSchema } from "../schema";
import { getCookieInfo } from "../middleware/getCookieInfo";
const ListingRoute = new Hono().basePath("");

ListingRoute.post(
  "/create",
  getCookieInfo,
  ZodValidator(createListingSchema),
  createListing
);
export default ListingRoute;
