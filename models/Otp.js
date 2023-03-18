const mongoose = require('mongoose')

const OtpSchema = new mongoose.Schema({
    email: { 
        type:String, 
        require:true 
    },
    Otp:{ 
        type:String, 
        require:true 
    },
    isVerified:{type:Boolean,default:false},
    createdAt: { type: Date, default: Date.now(), index: {expires: 500}}
},
   { timestamps:true }
   );

   const Otp = mongoose.model('Otp', OtpSchema)
 module.exports = Otp
