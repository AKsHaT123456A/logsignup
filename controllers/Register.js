const User=require("../models/User");
const CryptoJS = require("crypto-js");
const bcrypt=require("bcrypt");
const Otp =require("../models/Otp");
const otpEmailer = require("../utils/OtpEmailer");
const otp = Math.floor(1000 + Math.random() * 9000);
const stringOtp=otp.toString();
const register=async (req, res) => {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json("User already exists!");
        }
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          rollNum:req.body.rollNum,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString(),
          year: req.body.year,
          gender:req.body.gender,
          mobNo:req.body.mobNo,
          branch:req.body.branch,
        });
        const newOtp=new Otp({
          email:req.body.email,
          Otp: await bcrypt.hash(stringOtp,10)
        })
        try {
          const user = await newUser.save();
          const otp = await newOtp.save();
          otpEmailer(stringOtp,req.body.email);
          const { password,verifyToken,...info } = user._doc;
          res.status(201).json(info);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };
module.exports=register