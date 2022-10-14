const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get(
  "/:contactId",
  isValidId,
  authenticate,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactsAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactsAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorte)
);

module.exports = router;
