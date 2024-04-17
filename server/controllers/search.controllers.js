const Photographer = require("../models/photographer.model");

const searchPhotographer = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orConditions = [];

    if (req.query.name && req.query.name.trim() !== "") {
      orConditions.push(
        { last_Name: { $regex: new RegExp(req.query.name, "i") } },
        { first_Name: { $regex: new RegExp(req.query.name, "i") } }
      );
    }

    if (req.query.location && req.query.location.trim() !== "") {
      orConditions.push({
        location: { $regex: new RegExp(req.query.location, "i") },
      });
    }

    if (
      req.query.photography_style &&
      JSON.parse(req.query.photography_style).length > 0
    ) {
      orConditions.push({
        photography_style: { $in: JSON.parse(req.query.photography_style) },
      });
    }

    if (
      req.query.min_price &&
      req.query.max_price &&
      !isNaN(req.query.min_price) &&
      !isNaN(req.query.max_price)
    ) {
      orConditions.push({
        $expr: {
          $and: [
            {
              $gte: [
                parseInt(req.query.min_price),
                { $toInt: "$price_range.min" },
              ],
            },
            {
              $lte: [
                parseInt(req.query.max_price),
                { $toInt: "$price_range.max" },
              ],
            },
          ],
        },
      });
    }

    const searchCriteria = {
      $or: orConditions,
    };

    const totalPhotographer = await Photographer.countDocuments(searchCriteria);
    const totalPages = Math.ceil(totalPhotographer / limit);

    const data = await Photographer.find(searchCriteria)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);
    const metadata = {
      totalPhotographer,
      totalPages,
      currentPage: page,
      perPage: limit,
      nextPage: page < totalPages,
      previousPage: page > 1,
    };

    res.json({ data, metadata, message: "searched photographer" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { searchPhotographer };
