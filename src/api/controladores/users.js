const { User } = require("../modelos/users");
const { generateSign } = require("../../config/jwt");
const bcrypt=require("bcrypt")

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicated = await User.findOne({ userName: req.body.userName });
    if (userDuplicated) {
      return res.status(400).json("el nombre de usuario ya existe");
    }

    const userSaved = await newUser.save();

    return res.status(201).json(userSaved);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const login = async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName: userName }).populate("bookPublished");
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = generateSign(user._id);
          return res.status(200).json({ user, token });
        } else {
          return res.status(400).json("el usuario o contraseña no existe");
        }
      } else {
        return res.status(400).json("el usuario o contraseña no existe");
      }
    } catch (error) {
        console.log(error)
      res.status(400).json(error);
    }
  };


const getUser= async (req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}
module.exports = { register,login };
