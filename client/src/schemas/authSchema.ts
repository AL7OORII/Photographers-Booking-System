import { z } from "zod";

export const photographerSignUpSchema = z
  .object({
    first_Name: z
      .string({ required_error: "Please enter first name" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your first name",
      }),
    last_Name: z
      .string({ required_error: "Please enter first name" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your last name",
      }),
    password: z
      .string({ required_error: "Please enter password" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your password",
      }),
    email: z
      .string({ required_error: "Please enter email" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your email",
      }),
    price_range: z
      .object({
        min: z.string(),
        max: z.string(),
      })
      .required(),
    other_services: z.string().optional(),
    description: z
      .string({
        required_error: "Please enter a brief description",
      })
      .refine((value) => value.trim() !== "", {
        message: "Please enter a brief description",
      }),
    location: z
      .string({ required_error: "Please enter location" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your location",
      })
      .optional(),
    photography_style: z.array(z.string()),
    phone_Number: z.string({ required_error: "Please enter phone number" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const clientSignUpSchema = z
  .object({
    first_Name: z
      .string({ required_error: "Please enter first name" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your first name",
      }),
    last_Name: z
      .string({ required_error: "Please enter first name" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your last name",
      }),
    password: z
      .string({ required_error: "Please enter password" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your password",
      }),
    email: z
      .string({ required_error: "Please enter email" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your email",
      }),
    phone_Number: z.string({ required_error: "Please enter phone number" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  password: z
    .string({ required_error: "Please enter password" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your password",
    }),
  email: z
    .string({ required_error: "Please enter email" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your email",
    }),
});

export const photographerUpdateProfileSchema = z.object({
  price_range: z
    .object({
      min: z.string(),
      max: z.string(),
    })
    .required(),
  other_services: z.string().optional(),
  description: z
    .string({
      required_error: "Please enter a brief description",
    })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a brief description",
    }),
  location: z
    .string({ required_error: "Please enter location" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your location",
    })
    .optional(),
  photography_style: z.array(z.string()),
  // phone_Number: z.string({ required_error: "Please enter phone number" }),
});

export const photographerUpdatePasswordSchema = z
  .object({
    old_password: z
      .string({ required_error: "Please enter old password" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your old password",
      }),
    new_password: z
      .string({ required_error: "Please enter new password" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter your new password",
      }),
    confirm_password: z
      .string({ required_error: "Please confirm new password" })
      .refine((value) => value.trim() !== "", {
        message: "Please confirm your new password",
      }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
