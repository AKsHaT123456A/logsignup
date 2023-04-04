const bcrypt = require("bcrypt");
const Otp = require("../models/Otp");
const User = require("../models/User");
const verifyOtp= async (req, res) => {
  try {
    const otpHolder = await Otp.findOne({email:req.body.email});
    const userHolder = await User.findOne({email:req.body.email});
    if (!otpHolder) {
     return res.status(400).json("You are using an expired OTP!");
    } else {
        const validUser =  await bcrypt.compare(req.body.Otp, otpHolder.Otp);
      if (otpHolder.email === req.body.email && validUser) {
        const id=otpHolder._id;
        const user_id=userHolder._id;
        await Otp.findByIdAndUpdate({_id:id},{$set:{isVerified:true}});
        await User.findByIdAndUpdate({_id:user_id},{$set:{isVerified:true}});
        return res.status(200).json({
          message: "Email Verified!!",
        });
      } else {
        return res.status(400).json("Wrong OTP!");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports=verifyOtp