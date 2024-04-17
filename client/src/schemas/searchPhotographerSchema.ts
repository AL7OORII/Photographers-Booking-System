import { z } from "zod";

export const searchSchemaSchema = z.object({
  name: z
    .string()
    // .refine((value) => value.trim() !== "", {
    //   message: "Please enter your password",
    // })
    .optional(),
  email: z
    .string()
    // .refine((value) => value.trim() !== "", {
    //   message: "Please enter your password",
    // })
    .optional(),
  location: z
    .string()
    // .refine((value) => value.trim() !== "", {
    //   message: "Please enter your email",
    // })
    .optional(),
  price_range: z
    .object({
      min: z.string(),
      max: z.string(),
    })
    .optional(),
  photography_style: z.array(z.string()).optional(),
});
