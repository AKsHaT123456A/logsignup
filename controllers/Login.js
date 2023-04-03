const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
const Otp = require("../models/Otp");
const login = async (req, res) => {
    try {
      const email=req.body.email;
      const user = await User.findOne({ email:email  });
      const otpHolder = await Otp.findOne({email:email});
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
      const isVerified=otpHolder.isVerified;
      return res.status(201).json({accessToken,isVerified});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
module.exports = login;
