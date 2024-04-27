import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "password is required"),
});

export const SignUpSchema = z.object({
  username: z.string().trim(),
  email: z.string().email(),
  password: z.string().min(6, "Min Length of password should be 6"),
});
const radioButtonSchema = z
  .string()
  .refine((value) => value === "Yes" || value === "No", {
    message: 'Please select "yes" or "no".',
    path: ["radioButton"], // Optional: Set the error path for clarity
  });
export const createListingSchema = z.object({
  name: z.string().min(1, { message: "Name field is required" }),
  description: z
    .string()
    .min(30, { message: "Min length of description should be 30" })
    .max(100, { message: "Max length of description should be 100" }),
  address: z.string().min(1, { message: "Address is required" }),
  regularPrice: z.number(),
  discountPrice: z.number(),
  bathrooms: z.number(),
  bedrooms: z.number(),
  furnished: radioButtonSchema,
  parking: radioButtonSchema,
  type: z.enum([
    "Colonial",
    "Ranch",
    "Victorian",
    "Mid-century Modern",
    "Craftsman",
  ]),
  offer: radioButtonSchema,
});
