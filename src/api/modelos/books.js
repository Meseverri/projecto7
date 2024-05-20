const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    authorId:{type:mongoose.Types.ObjectId,ref:"User"},
    title:{type:String},
    genres:[{type:String}],
    description:{type:String},
    reviewsId:[{type:mongoose.Types.ObjectId,ref:"Review"}]
  },
  {
    timestamps: true,
  }
);


const Book = mongoose.model("Book", bookSchema, "books");
module.exports = {Book};