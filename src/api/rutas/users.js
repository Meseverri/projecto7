const { register,login } = require("../controladores/users");

const usersRoutes = require("express").Router();


usersRoutes.post("/register", register);
usersRoutes.post("/login", login);




module.exports = {usersRoutes};
