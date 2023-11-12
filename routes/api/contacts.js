const express = require("express");

const ctrl = require("../../controllers/contacts");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.put("/:contactId", authenticate, ctrl.updateContact);

router.patch("/:contactId/favorite", authenticate, ctrl.updateStatusContact);

module.exports = router;
