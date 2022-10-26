const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: "volodymyr_kavun@meta,ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const mail = {
  to: "goit@gmail.com",
  from: "volodymyr_kavun@meta,ua",
  subject: "Прохання взяти мене на роботу)",
  html: "Ментором)",
};

transport
  .sendMail(mail)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
