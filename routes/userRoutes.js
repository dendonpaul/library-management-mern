const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.register_user);
router.post("/login", UserController.login_user);

module.exports = router;
