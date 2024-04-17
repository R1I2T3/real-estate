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
