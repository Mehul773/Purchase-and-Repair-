const nodemailer = require("nodemailer");

const user = process.env.USER;
const pass = process.env.PASS;

const admin = process.env.ADMIN_USER;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, token) => {
  console.log("Inside sendconfirm");
  transport
    .sendMail({
      from: user,
      to: admin,
      subject: "Signup request",
      html: `<h1>Email Confirmation</h1>
          <h2>Request from ${email}</h2>
          <p> Please confirm this email by clicking on the following link</p>
          <a href=http://localhost:3000/admin/dashboard> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendActivationEmail = (name, email, token) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Your account has been verified",
      html: `<h1>Email confirmed</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/login/pc> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendDeclineEmail = (name, email, token) => {
  console.log("Inside decline");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "About account suspendation",
      html: `<h1>Now you have to sign up again</h1>
          <h2>User ${email} is deleted</h2>

          </div>`,
    })
    .catch((err) => console.log(err));
};
