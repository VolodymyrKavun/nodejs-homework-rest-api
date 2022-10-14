const { RequestError } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  if ((!name, !email)) {
    throw RequestError(401, "Not authorized");
  }
  res.json({
    name,
    email,
  });
};

module.exports = getCurrent;
