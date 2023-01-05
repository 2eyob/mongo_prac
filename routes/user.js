const express = require("express");
const router = express.Router();
const { getAll, create } = require("../controllers/userController");
router.route("/users").get(getAll).post(create);
module.exports = router;
