require("dotenv").config();
const mongoose = require("mongoose");
const { User } = require("../api/modelos/users");
const { Review } = require("../api/modelos/reviews");
const { Book } = require("../api/modelos/books");
const { userSeed, orwellBook, orwellReviews } = require("./data");

const findUser = (list, name) => {
  return list.find((user) => user.userName === name);
};
mongoose
  .connect(process.env.DB_url_production)
  .then(async () => {
    await User.collection.drop();
    await Book.collection.drop();
    await Review.collection.drop();
    // Create all users with a for loop keep the id 
    //*Nota: no se estan encriptando al hacer insert many idea hacer un bucle e insertarlo uno a uno.
    // const allusers = await User.insertMany(userSeed);
    const allusers =[];
    for (let i = 0; i < userSeed.length; i++) {
      const newUser = new User(userSeed[i]);

      const userSaved = await newUser.save();
      allusers.push(userSaved);
    }

    //set user admin 
    let admin = findUser(allusers, "Admin");
    await User.findByIdAndUpdate(
      admin._id,
      { role: "admin" },
      { new: true }

    );
    // Orwell book publish
    let orwell = findUser(allusers, "Orwell");
    const newBook = new Book({
      authorId: orwell._id,
      title: orwellBook.title,
      genres: orwellBook.genres,
      description: orwellBook.description,
    });

    const authorBookUpdated = await User.findByIdAndUpdate(
      orwell._id,
      { role: "author", $push: { bookPublished: newBook._id } },
      { new: true }
    );
    const bookSave = await newBook.save();

    // Users review of the book

    for (let i = 0; i < orwellReviews.length; i++) {
      const reviewUser = orwellReviews[i];
      const ratingRound = Math.round(reviewUser.rating * 10) / 10; //round to first decimal
      let userObj = findUser(allusers, reviewUser.username);

      const newReview = new Review({
        userId: userObj._id,
        body: reviewUser.body,
        rating: ratingRound,
        bookId: newBook._id,
      });

      const userReviewsUpdated = await User.findByIdAndUpdate(
        userObj._id,
        { $push: { bookReviews: newReview._id } },
        { new: true }
      );

      const reviewSaved = await newReview.save();
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .finally(() => mongoose.disconnect());
