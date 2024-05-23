const { reviewBook } = require("../controladores/reviews");

const reviewsRoutes = require("express").Router();

reviewsRoutes.post("/:userId/:bookId",reviewBook);

module.exports={reviewsRoutes}