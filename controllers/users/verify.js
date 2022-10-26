const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken }); // перевіряємо, чи є в базі користувач з таким токеном
  if (!user) {
    throw RequestError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: [true, "Verify token is required"],
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verify;
