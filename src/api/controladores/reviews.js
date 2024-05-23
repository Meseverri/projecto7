const Review = require("../modelos/reviews");
const { User } = require("../modelos/users");

const reviewBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    const { body, rating } = req.body;
    rating = Math.round(rating * 10) / 10; //round to first decimal

    const newReview = new Review({
      userId: userId,
      body: body,
      rating: rating,
      bookId: bookId,
    });

    const userReviewsUpdated= await User.findByIdAndUpdate(userId,
        { $push: { bookReviews: newReview._id } },
        {new:true}
    ).populate("bookReviews").populate("bookPublished");

    
    const reviewSaved = await newReview.save();


  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { reviewBook };
