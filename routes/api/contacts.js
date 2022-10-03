const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validateBody(schemas.contactsAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateBody(schemas.contactsAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;

