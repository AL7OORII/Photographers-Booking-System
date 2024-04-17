import { z } from "zod";

const MAX_IMAGE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_DOCUMENT_COUNT = 5;

export const uploadPicSchema = z.object({
  image: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_IMAGE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
