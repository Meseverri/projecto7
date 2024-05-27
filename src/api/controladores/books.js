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

    // const author= new User();
    // author._id=authorId
    const authorBookUpdated = await User.findByIdAndUpdate(
      authorId,
      { $push: { bookPublished: newBook._id } },
      { new: true }
    ).populate("bookPublished");
    const bookSave = await newBook.save();

    return res.status(201).json({ newBook, authorBookUpdated });
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

  }
};
const getBook = async (req, res) => {
  try {
  } catch (error) {}
};

const editBook = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteBook = async (res, req) => {
  try {
  } catch (error) {}
};

module.exports = { createBook,getBooks };
