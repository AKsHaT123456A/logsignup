const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
const login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json("Email not found!");
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== req.body.password)
        return res.status(400).json("Wrong Password");
        const id=user.id;
      var payload = {
        _id: id,
      };
      console.log(payload);
      const accessToken = jwt.sign({ payload }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "50d",
      });
      await User.findByIdAndUpdate({_id:id},{$set:{verifyToken:accessToken}})
      const { password,verifyToken,_id,...info } = user._doc;
      res.status(201).json({ ...info});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = login;
