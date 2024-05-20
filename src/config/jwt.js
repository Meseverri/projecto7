const jwt = require("jsonwebtoken");

// crear una llave
const generateSign = (id) => {
    return jwt.sign({ id }, process.env.jwt_token, { expiresIn: "30w" });
}


// comprobar si esa llave fue creada por el cerrajero de confianza
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.jwt_token);
}

module.exports = { generateSign, verifyJwt }