const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
const login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json("Email not found!");
      const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
      if (originalPassword !== req.body.password)
        return res.status(401).json("Wrong Password");
        const id=user.id;
      var payload = {
        _id: id,
        user:user.username
      };
      const accessToken = jwt.sign({ payload }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "50d",
      });
      await User.findByIdAndUpdate({_id:id},{$set:{verifyToken:accessToken}})
      // const { password,_id,...info } = user._doc;
      return res.status(201).json({accessToken});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
module.exports = login;
