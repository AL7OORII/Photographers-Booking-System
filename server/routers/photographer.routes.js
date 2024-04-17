const express = require("express");
const authMiddleware = require("../middlewares/authentication");

const {
  getPhotographerDetails,
  uploadPhotographerImages,
  getAllPhotographerPhotos,
  getTopRatedPhotographer,
  getPhotographerReviews,
  addPhotographerRatingAndReview,
  updatePhotographerDetails,
  updatePhotographerPassword,
  deletePhotographerPhoto,
  deletePhotographer,
} = require("../controllers/photographer.controller");
const router = express.Router();

//photographer details
router.get("/details/:photographerId", getPhotographerDetails);
// upload photographer image
router.post(
  "/upload/:photographerId",
  authMiddleware,
  uploadPhotographerImages
);

//get photographer photos
router.get("/photos/:photographerId", getAllPhotographerPhotos);
//delete photographer photos
router.delete("/photos/:photoId", authMiddleware, deletePhotographerPhoto);
router.get("/top-rated", getTopRatedPhotographer);

//add photographer review
router.post(
  "/review-and-rating/:bookingId",
  authMiddleware,
  addPhotographerRatingAndReview
);

router.get("/reviews/:photographerId", getPhotographerReviews);

//update photographer details
router.patch("/", authMiddleware, updatePhotographerDetails);

//update photographer password
router.patch("/password", authMiddleware, updatePhotographerPassword);

//delete photographer
router.delete("/:photographerId", authMiddleware, deletePhotographer);

module.exports = router;
