const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }); // шукаємо користувача з таким мейлом
  if (!user) {
    throw RequestError(400, "missing required field email");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  if (!mail) {
    throw RequestError(400, "Verification has already been passed");
  }

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
