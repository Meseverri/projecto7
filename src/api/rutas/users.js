const { authenticateUser } = require("../../middlewares/auth");
const { register,login, getUser, getUsers, deleteUser } = require("../controladores/users");

const usersRoutes = require("express").Router();


usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.get("/:id", getUser);
usersRoutes.get("", getUsers);
usersRoutes.delete("/:userId", authenticateUser,deleteUser);




module.exports = {usersRoutes};
