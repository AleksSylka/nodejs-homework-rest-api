const nodemailer = require("nodemailer");

require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    tls: {
    // do not fail on invalid certs
        rejectUnauthorized: false,
    },
    auth: {
        user: "aleks.sylka@meta.ua",
        pass: META_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

module.exports = transport;

// const email = {
//     to: "niris79656@sesxe.com",
//     from: "aleks.sylka@meta.ua",
//     subject: "Test email",
//     html: "<p><b>Test email</b> from Aleks</p>"
// };

// transport.sendMail(email)
//     .then(() => console.log("Email send success"))
//     .catch(error => console.log(error.message));