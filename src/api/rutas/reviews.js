const { reviewBook, getReviews } = require("../controladores/reviews");

const reviewsRoutes = require("express").Router();

reviewsRoutes.post("/:userId/:bookId",reviewBook);
reviewsRoutes.get("",getReviews);

module.exports={reviewsRoutes}