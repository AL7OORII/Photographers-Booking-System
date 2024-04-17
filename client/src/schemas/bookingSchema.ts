import { z } from "zod";
const MAX_IMAGE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_DOCUMENT_COUNT = 5;

export const bookingSchema = z.object({
  date: z.date({ required_error: "Please select booking date" }),
});

export const sendMessageSchema = z.object({
  content: z
    .string({ required_error: "Please enter Message" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your Message",
    }),
  photographerId: z.string({ required_error: "Please enter email" }),
  clientId: z.string({ required_error: "Please enter email" }),
  bookingId: z.string({ required_error: "Please enter email" }),
  sender: z.enum(["client", "photographer"]),
});

export const updateBokkingStatusSchema = z.object({
  status: z
    .string({ required_error: "Please select status" })
    .refine((value) => value.trim() !== "", {
      message: "Please select status",
    }),
});

export const photographerBookingUpdateSchema = z.object({
  message: z
    .string({ required_error: "Please enter message" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter message",
    }),
  createdBy: z
    .string({ required_error: "Error " })
    .refine((value) => value.trim() !== "", {
      message: "Error",
    }),
  clientId: z
    .string({ required_error: "Error " })
    .refine((value) => value.trim() !== "", {
      message: "Error",
    }),
  bookingId: z
    .string({ required_error: "Please select status" })
    .refine((value) => value.trim() !== "", {
      message: "Please select status",
    }),
  image: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_IMAGE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

export const uploadPhotographerFinishedPhotoSchema = z.object({
  createdBy: z
    .string({ required_error: "Error " })
    .refine((value) => value.trim() !== "", {
      message: "Error",
    }),
  bookingId: z
    .string({ required_error: "Please select status" })
    .refine((value) => value.trim() !== "", {
      message: "Please select status",
    }),
  image: z
    .any()
    .refine((files) => files && files.name, `Please select photo`)
    .refine((files) => {
      return files?.size <= MAX_IMAGE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const userSatisfiedSchema = z.object({
  satisfied: z.boolean(),
});

export const ratingAndReviewSchema = z.object({
  text: z.string(),
  createdBy: z.string(),
  photographerId: z.string(),
  rating: z.number(),
});
