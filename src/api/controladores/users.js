const { User } = require("../modelos/users");
const { generateSign } = require("../../config/jwt");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { username, password,name }=req.body

    const newUser = new User({
      userName:username,
      password:password,
      name:name,
    role:"user"});

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
    const user = await User.findOne({ userName: userName }).populate(
      "bookPublished"
    );
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
    console.log(error);
    return res.status(400).json(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("no se ha encontrado el usuario");
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const {userId}=req.params
    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) {
      return res.status(404);
    }
    return res.status(200).json({
      mensaje: "Este usuario ha sido eliminado",
      userDeleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { register, login, getUser, getUsers, deleteUser };
