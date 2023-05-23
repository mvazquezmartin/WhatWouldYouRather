require("dotenv").config();
const jwt = require("jsonwebtoken");

const PRIVATEKEY = process.env.PRIVATE_KEY;

const generateToken = (user) => {
  const token = jwt.sign(user, PRIVATEKEY, { expiresIn: "1d" });
  return token;
};

//PASSPORT-JWT COMPRUEBA EL TOKEN - DEPRECATED
const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ status: "error", error: "Not authenticated" });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, PRIVATEKEY, (error, credentials) => {
    if (error)
      return res.status(403).json({ status: "error", error: "Forbiden" });
    req.user = credentials.user;
    next();
  });
};

module.exports = {
  PRIVATEKEY,
  generateToken,
  authToken,
};
