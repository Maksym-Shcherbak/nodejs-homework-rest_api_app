const express = require("express");
const contactsController = require("../../controllers/contacts-ctrl");
const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getOneContact);

router.post("/", contactsController.addNewContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", contactsController.updateContactById);

router.patch(
  "/:contactId/favorite",
  contactsController.updateContactFieldFavorite
);

module.exports = router;
