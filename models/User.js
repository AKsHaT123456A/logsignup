const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: 1, trim: true },
    email: { type: String, required: true },
    rollNum: {
      type: Number,
      required: true,
      maxlength: [13, "Number should be of 13 digit"],
      minlength: [13],
      unique: 1,
    },
    year: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    mobNo: {
      type: Number,
      required: true,
      maxlength: [10, "Number should be of 10 digit"],
      minlength: [10],
    },
    branch: {
      type: String,
      enum: [
        "CSE",
        "CS",
        "CSE(AI&ML)",
        "CSE(DS)",
        "ECE",
        "ME",
        "CE",
        "EN",
        "IT",
        "CSIT",
        "CSE(HINDI)",
        "",
      ],
    },
    password: { type: String, required: true },
    verifyToken: { type: String, default: "" },
    isVerified:{type:Boolean,default:false},
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
