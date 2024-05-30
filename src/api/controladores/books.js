const mongoose  = require("mongoose");
const { Book } = require("../modelos/books");
const { User } = require("../modelos/users");

const createBook = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const { title, genres, description } = req.body;

    const newBook = new Book({
      authorId: authorId,
      title: title,
      genres: genres,
      description: description,
    });

    const bookDuplicated = await Book.findOne({
      authorId: authorId,
      title: title,
    });

    if (bookDuplicated) {
      return res.status(400).json("el libro ya esta creado");
    }
    const authorBookUpdated = await User.findByIdAndUpdate(
      authorId,
      { role:"author",
        $push: { bookPublished: newBook._id } },
      { new: true }
    ).populate("bookPublished");
    const bookSave = await newBook.save();

    return res.status(201).json({ bookSave, authorBookUpdated });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(400).json(error);

  }
};
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const editBook = async (req, res) => {
  try {
    const { bookId,authorId } = req.params;
    const author= await User.findById(authorId);
    const objBookId = new mongoose.Types.ObjectId(bookId);
    if (author.bookPublished.includes(objBookId)) {
      const {title:newtitle,genres:newGenreList,description:newDescription}=req.body;
      const updateFields = {};
      if (newtitle) updateFields.title = newtitle;
      // if (newGenreList) updateFields.$push = { cart: newToCart };
      if (newGenreList) updateFields.genres =  newGenreList ;
      if (newDescription) updateFields.description = newDescription;

      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        updateFields,
        { new: true }
      )
      return res.status(201).json(updatedBook)
    } else{
      return res.status(400).json("You are not the author of this book")
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId,authorId } = req.params;
    const author= await User.findById(authorId);
    const objBookId = new mongoose.Types.ObjectId(bookId);
    if (author.bookPublished.includes(objBookId)){

      const bookDeleted = await Book.findByIdAndDelete(bookId);
      if (!bookDeleted) {
        return res.status(404);
      };

      author.bookPublished.pull(objBookId);
      await author.save();
      return res.status(200).json({
        mensaje: "Este libro ha sido eliminado",
        bookDeleted,
      });
    }
  } catch (error) {
     return res.status(500).json(error);
  }
};

module.exports = { createBook, getBooks, getBook ,editBook,deleteBook};
