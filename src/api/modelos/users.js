const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    name:{ type: String, required: true },
    bookReviews:[{type: mongoose.Types.ObjectId, ref: "Review"} ],
    bookPublished:[{type:mongoose.Types.ObjectId ,ref:"Book"}],
    role:{type: String,default:"user",enum:["user","author","admin"]}
    
  }
);


userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("User", userSchema, "users");
module.exports = {User};


