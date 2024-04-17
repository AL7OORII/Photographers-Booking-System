import { z } from "zod";

export const photographerReviewAndBookingSchema = z.object({
    text: z.date({ required_error: "Please select booking date" }),
  });