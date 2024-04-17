import { z } from "zod";

export const feedbackSchema = z.object({
  comment: z.string(),
  createdBy: z.string(),
  photography_style: z.array(z.string()),
  rating: z.number(),
});

export const ratingDes = [
  {
    rating: 1,
    desc: "Poor",
  },
  {
    rating: 2,
    desc: "Fair",
  },
  {
    rating: 3,
    desc: "Good",
  },
  {
    rating: 4,
    desc: "Very good",
  },
  {
    rating: 5,
    desc: "Excellent",
  },
];
