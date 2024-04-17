const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const photographerSchema = new mongoose.Schema(
  {
    first_Name: {
      type: String,
      required: true,
    },
    last_Name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phone_Number: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photography_style: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "photographer",
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PhotographerPhoto",
      },
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PhotographerPhoto",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PhotographerReview",
      },
    ],
    ratings: [
      {
        type: Number,
        enum: {
          values: [1, 2, 3, 4, 5],
          message: "Rating must be an integer between 1 and 5",
        },
      },
    ],

    price_range: {
      min: { type: String, lowercase: true, trim: true },
      max: { type: String, lowercase: true, trim: true },
    },
    other_services: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      secure_url: {
        type: String,
      },
      asset_id: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
    subscriptio_status: {
      type: mongoose.Mixed,
      default: "active",
      enum: ["active" | "canceled"],
    },
  },
  { timestamps: true }
);

// Define virtual property for average rating
photographerSchema.virtual("averageRating").get(function () {
  if (this.ratings) {
    const totalRatings = this.ratings.length;
    if (totalRatings === 0) return 0;

    const sumOfRatings = this.ratings.reduce((acc, rating) => acc + rating, 0);
    return sumOfRatings / totalRatings;
  }
});

//HASH PASSWORD
photographerSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew || this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});



// COMPARE PASSWORD
photographerSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//CREATE JWT
photographerSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      photographerID: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

photographerSchema.set("toObject", { virtuals: true });
photographerSchema.set("toJSON", { virtuals: true });

const Photographer =
  mongoose.models?.Photographer ||
  mongoose.model("Photographer", photographerSchema);
module.exports = Photographer;
