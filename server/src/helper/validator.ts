import { validator } from "hono/validator";
import { ZodSchema } from "zod";

export const ZodValidator = (schema: ZodSchema) =>
  validator("json", (value, c) => {
    const parsedValue = schema.safeParse(value);
    if (!parsedValue.success) {
      return c.text("Invalid data provided", 401);
    }
    return parsedValue;
  });
