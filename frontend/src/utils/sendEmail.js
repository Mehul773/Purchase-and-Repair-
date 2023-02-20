const nodemailer = require("nodemailer");
module.exports = async(email,subject,text)=>{
    try {
        const trasporter = nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            port:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        });

        await trasporter.sendMail({
            from:process.env.USER,
            to:process.env.ADMIN_USER,
            subject:subject,
            text:text
        })
        console.log("Email sent Succesfully");

    } catch (error) {
        console.log("Email not sent Succesfully");
        console.log(error);
    }
}