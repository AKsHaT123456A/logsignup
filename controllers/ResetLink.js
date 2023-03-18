const User=require("../models/User");
const emailer=require("../utils/Emailer");
const jwt=require("jsonwebtoken");
const passlink=async (req, res) => {

  const { email } = req.body;

  if (!email) {
    res.status(401).json("Enter Your Email");
  }

  try {
    const user = await User.findOne({ email: email });
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    const userToken = await User.findByIdAndUpdate(
      { _id: user._id },
      {$set:{ verifyToken: token }},
      { new: true }
    );
   console.log(userToken);
    if (userToken) {
      emailer(user.id, userToken.verifyToken,email);
      res.status(200).json("sent");

    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json("invalid user");
  }
};
module.exports=passlink