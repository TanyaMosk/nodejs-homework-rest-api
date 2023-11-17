const express = require("express");

const ctrl = require("../../controllers/auth");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

// signup
router.post("/register", ctrl.register);

// signin
router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/:userId/subscription", authenticate, ctrl.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
