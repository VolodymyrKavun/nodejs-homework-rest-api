const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");

  // Дає можливість знайти все, що потрібно "findOne"
  // const result = await Contact.findOne({_id: id});

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
