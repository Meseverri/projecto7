const Review = require("../modelos/reviews");
const { User } = require("../modelos/users");

const reviewBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    const { body, rating } = req.body;
    const ratingRound = Math.round(rating * 10) / 10; //round to first decimal

    const newReview = new Review({
      userId: userId,
      body: body,
      rating: ratingRound,
      bookId: bookId,
    });

    const userReviewsUpdated= await User.findByIdAndUpdate(userId,
        { $push: { bookReviews: newReview._id } },
        {new:true}
    );

    
    const reviewSaved = await newReview.save();
    return res.status(201).json({
      user:userReviewsUpdated,
      savedReview:reviewSaved
    })

  } catch (error) {
    return res.status(400).json(error);
  }
};
const getReviews = async (req,res)=>{
  try {
    const reviews= await Review.find();
    return res.status(200).json(reviews);
  }catch(error){
    return res.status(400).json(error);
  }
}

module.exports = { reviewBook,getReviews };
