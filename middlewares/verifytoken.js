const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const ver=jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return "Token is not a valid";
      req.user = user;
      next();
    });
    if(ver!=="Token is not a valid")  return res.status(200).json(true);
    else return res.status(403).json(ver);
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
module.exports = verify;
