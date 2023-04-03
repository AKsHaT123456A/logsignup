const router =  require("express").Router();
const register=require("../controllers/Register");
const login=require("../controllers/Login");
const verify=require("../middlewares/verifytoken");
const passlink=require("../controllers/ResetLink");
const verifyOtp=require("../controllers/OtpVerification");
const reset=require("../controllers/Reset");
//REGISTER
router.post("/register",register);
//LOGIN
router.post("/login",login);
router.get("/verifyToken",verify);
//verification
router.patch("/register/verify",verifyOtp);
router.get("/forgetPasswordLink",passlink);
router.post("/forgotpassword/:id/:token",reset);
module.exports = router;
