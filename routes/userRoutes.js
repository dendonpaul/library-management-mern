const router = require("express").Router();
const UserController = require("../controllers/UserController");
const ClientController = require("../controllers/ClientController");

router.post("/register", UserController.register_user);
router.post("/login", UserController.login_user);

router.post("/addclient", ClientController.register_client);

module.exports = router;
