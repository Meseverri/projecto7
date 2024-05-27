const { authenticateUser,adminAuth, authorAuth } = require("../../middlewares/auth");
const { createBook, getBooks } = require("../controladores/books");

const bookRoutes = require("express").Router();

bookRoutes.post("/:authorId",authorAuth,createBook)
bookRoutes.get("",authenticateUser,getBooks)

module.exports={bookRoutes}