const nodemailer=require("nodemailer")
const otpEmailer=(otp,email)=>{const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.TEST_EMAIL,
        pass:process.env.pass
    }
}) 
const mailOptions = {
    from:process.env.senderEmail,
    to:email,
    subject:"Sending Email For Otp",
    text:`This Otp Valid For 5 MINUTES ${otp}`
}

transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log(error);
        res.status(401).json("email not send")
    }else{
        console.log("Email sent",info.response);
        res.status(201).json("Email sent Succsfully")
    }
})
};
module.exports=otpEmailer
