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
    const authorBookUpdated= await User.findByIdAndUpdate(authorId,
        { $push: { bookPublished: newBook._id } },
        {new:true}
    );
    const bookSave = await newBook.save();

    return res.status(201).json(authorBookUpdated);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
module.exports = { createBook };
