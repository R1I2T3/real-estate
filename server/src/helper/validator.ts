import { validator } from "hono/validator";
import { ZodSchema } from "zod";

export const ZodValidator = (schema: ZodSchema, option: any) =>
  validator(option, async (value, c) => {
    const parsedValue = schema.safeParse(value);
    if (!parsedValue.success) {
      return c.text("Invalid data provided", 401);
    }
    c.set("parsedData", parsedValue.data);
    return parsedValue.data;
  });
