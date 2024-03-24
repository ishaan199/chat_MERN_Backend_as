const express = require("express");

const router = express.Router();

const loginController = require('../controllers/userController')

router.post("/login", loginController.loginController);
router.post("/register", loginController.registerController);

module.exports = router;
