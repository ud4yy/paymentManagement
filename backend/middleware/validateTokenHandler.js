const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer")) {
     return res.status(401).json("Token Missing");
    }
  
    token = authHeader.split(" ")[1];
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json("Unauthorized User");
      }
      req.user = decoded.user;
      next();
    });
  });

module.exports = validateToken;