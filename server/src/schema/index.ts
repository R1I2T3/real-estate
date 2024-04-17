import { z } from "zod";
export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Minimum length of password should be 6" }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Minimum length of password must be 6" }),
});

export const updateSchema = z.object({
  username: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Min length of password must be 6" })
    .optional(),
});

export const createListingSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  regularPrice: z.coerce.number(),
  discountPrice: z.coerce.number(),
  bathrooms: z.coerce.number(),
  bedrooms: z.coerce.number(),
  furnished: z.coerce.boolean(),
  parking: z.coerce.boolean(),
  type: z.enum([
    "Colonial",
    "Ranch",
    "Victorian",
    "Mid-century Modern",
    "Craftsman",
  ]),
  offer: z.coerce.boolean(),
});

export const updateListingSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  regularPrice: z.coerce.number().optional(),
  discountPrice: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  furnished: z.coerce.boolean().optional(),
  parking: z.coerce.boolean().optional(),
  type: z
    .enum(["Colonial", "Ranch", "Victorian", "Mid-century Modern", "Craftsman"])
    .optional(),
  offer: z.coerce.boolean().optional(),
});
