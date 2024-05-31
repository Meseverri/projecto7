const jwt = require("jsonwebtoken");
const { verifyJwt } = require("../config/jwt");
const { User } = require("../api/modelos/users");

require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_token);
    req.user = decoded;
    
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  const parsedToken = token.replace("Bearer ", "");
  const { id } = verifyJwt(parsedToken);

  const user = await User.findById(id);

  if (user.role !== "admin") {
    return res
      .status(403)
      .send({ error: "Access denied. You do not have the required role." });
  }
  next();
};

const authorAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  const parsedToken = token.replace("Bearer ", "");
  const { id } = verifyJwt(parsedToken);

  const user = await User.findById(id);

  if (user.role !== "author") {
    return res
      .status(403)
      .send({ error: "Access denied. You do not have the required role." });
  }
  next();
};

module.exports = { authenticateUser, adminAuth, authorAuth };
