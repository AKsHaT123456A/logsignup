const nodemailer=require("nodemailer")
const emailer=(user,token,email)=>{const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.TEST_EMAIL,
        pass:process.env.pass
    }
}) 
const mailOptions = {
    from:process.env.senderEmail,
    to:email,
    subject:"Sending Email For password Reset",
    text:`This Link Valid For 10 MINUTES ${process.env.URI}/forgotpassword/${user}/${token}`
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
module.exports=emailer
