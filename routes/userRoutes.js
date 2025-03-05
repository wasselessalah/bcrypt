const express = require("express");
const {helloUser,helloUserAdmin} = require("../controllers/userController");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/hello",verifyToken, helloUser);
router.get("/helloadmin",verifyTokenAdmin, helloUserAdmin);

module.exports = router;
