//jshint esversion:6
const express=require("express");
const app=express();
const cors=require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();
app.use(express.json());
app.use(cors());
const authRoute=require("./routes/auth");
const port = 3000 || process.env.PORT;
mongoose
  .connect(process.env.DATABASE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
app.use("/api/auth", authRoute);
app.listen(port, () => {
  console.log(`Sever running at ${port}`);
});
