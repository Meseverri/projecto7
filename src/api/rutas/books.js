const { authenticateUser,adminAuth, authorAuth } = require("../../middlewares/auth");
const { createBook, getBooks, getBook,editBook,deleteBook } = require("../controladores/books");

const bookRoutes = require("express").Router();

bookRoutes.post("/:authorId",authorAuth,createBook);
bookRoutes.get("",authenticateUser,getBooks);
bookRoutes.get("/:bookId",authenticateUser,getBook);
bookRoutes.put("/:bookId/:authorId",authorAuth,editBook)



module.exports={bookRoutes}