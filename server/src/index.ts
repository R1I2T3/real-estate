import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { v2 as cloudinary } from "cloudinary";
import AuthRoute from "./routes/auth.route";
import ListingRoute from "./routes/listing.route";
import UserRoute from "./routes/user.route";
import { getCookieInfo } from "./middleware/getCookieInfo";
const app = new Hono();

// using hono middleware
app.use(cors());
app.use(logger());
app.use(poweredBy());

// Routes configurations
app.route("/api/auth", AuthRoute);
app.route("/api/user", UserRoute);
app.route("api/listing", ListingRoute);
// Cloudinary config
app.get("/api", getCookieInfo, (c) => {
  return c.json({ message: "User is authenticated" });
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default app;
