const express = require("express");
const { register, login } = require("../controllers/authController");
const rateLimit=require('express-rate-limit')
const router = express.Router();




router.post("/register", register);
router.post("/login", login);

module.exports = router;
