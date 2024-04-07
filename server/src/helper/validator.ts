import { validator } from "hono/validator";
import { signUpSchema, loginSchema } from "../helper/schema";
export const signUpValidator = validator("json", (value, c) => {
  const parsedValue = signUpSchema.safeParse(value);
  if (!parsedValue.success) {
    return c.text("Invalid data provided", 401);
  }
  return parsedValue;
});

export const LoginValidator = validator("json", (value, c) => {
  const parsedValue = loginSchema.safeParse(value);
  if (!parsedValue.success) {
    return c.text("Invalid data provided", 401);
  }
  return parsedValue;
});
