var jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      res.status(403).json({ msg: "Token Not found ! " });
      return;
    }

    var decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded); // bar

    if (decoded) {
      if (role.includes(decoded.role)) {
        req.userId = decoded.id;
        // req.userRole = decoded.role;
        next();
      } else {
        res.status(403).json({ msg: "You are not allowed" });
      }
    } else {
      return res.status(403).json({ msg: "Invalid Token" });
    }
  };
}; // authMiddleware

module.exports = authMiddleware;
