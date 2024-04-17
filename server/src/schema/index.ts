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
  avatar: z.string().optional(),
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
  type: z.string(),
  offer: z.coerce.boolean(),
});
