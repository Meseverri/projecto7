const { authenticateUser,adminAuth } = require("../../middlewares/auth");
const { register,login, getUser, getUsers, deleteUser, changeRoleAdmin } = require("../controladores/users");

const usersRoutes = require("express").Router();


usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.get("/:userId", getUser);
usersRoutes.put("/:userId/admin",adminAuth ,changeRoleAdmin);
usersRoutes.get("", getUsers);
usersRoutes.delete("/:userId", authenticateUser,deleteUser);


module.exports = {usersRoutes};