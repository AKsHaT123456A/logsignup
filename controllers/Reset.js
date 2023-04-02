const User=require("../models/User");
const jwt=require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const reset=async(req,res)=>{
        const {id,token} = req.params;
    
        const {password} = req.body;
    
        try {
            const validuser = await User.findOne({_id:id,verifyToken:token});
            const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
            console.log(verifyToken);
            if(validuser && verifyToken._id){
                const newpassword =  CryptoJS.AES.encrypt(
                    password,
                    process.env.SECRET_KEY
                  ).toString();
    
                const setnewuserpass = await User.findByIdAndUpdate({_id:id},{$set:{password:newpassword}});
    
                setnewuserpass.save();
                res.status(201).json("Password Reseted")
    
            }else{
                res.status(401).json("User does not exist")
            }
        } catch (error) {
            res.status(401).json(error)
        }
    };
module.exports=reset;