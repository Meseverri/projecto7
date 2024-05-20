const { createBook } = require("../controladores/books");

const bookRoutes = require("express").Router();

bookRoutes.post("/:authorId",createBook)

module.exports={bookRoutes}