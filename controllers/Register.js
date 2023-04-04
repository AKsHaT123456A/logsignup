const User = require("../models/User");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const Otp = require("../models/Otp");
const otpEmailer = require("../utils/OtpEmailer");
const otp = Math.floor(1000 + Math.random() * 9000);
const stringOtp = otp.toString();
const register = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("User already exists!");
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      rollNum: req.body.rollNum,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      year: req.body.year,
      gender: req.body.gender,
      mobNo: req.body.mobNo,
      branch: req.body.branch,
    });
    console.log(newUser);
    const String=await bcrypt.hash(stringOtp, 10);
    const newOtp = new Otp({
      email: email,
      Otp: String,
    });
    const otp = await newOtp.save();
    await newUser.save();
    console.log(otp);
    otpEmailer(stringOtp, req.body.email);
    // const { password,verifyToken,__v,createdAt,updatedAt,_id,...info } = user._doc;
    res.status(201).json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = register;
