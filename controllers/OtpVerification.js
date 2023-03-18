const bcrypt = require("bcrypt");
const Otp = require("../models/Otp");
const verifyOtp= async (req, res) => {
  try {
    const email = req.body.email;
    const otpHolder = await Otp.findOne({email:email});
    if (!otpHolder) {
     return res.status(400).json("You are using an expired OTP!");
    } else {
        const validUser =  await bcrypt.compare(req.body.Otp, otpHolder.Otp);
      if (otpHolder.email === req.body.email && validUser) {
        const id=otpHolder._id;
        await Otp.findByIdAndUpdate({_id:id},{$set:{isVerified:true}});
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