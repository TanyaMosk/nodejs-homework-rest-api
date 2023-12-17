const express = require("express");

const ctrl = require("../../controllers/auth");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

// signup
router.post("/register", ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", ctrl.resendVerifyEmail);

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

router.post("/forgot-password", ctrl.forgotPassword);

module.exports = router;
