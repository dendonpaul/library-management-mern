const router = require("express").Router();
const UserController = require("../controllers/UserController");
const ClientController = require("../controllers/ClientController");
const BookController = require("../controllers/BookController");
const IssueController = require("../controllers/IssueController");

router.post("/register", UserController.register_user);
router.post("/login", UserController.login_user);

//Client Routes
router.post("/addclient", ClientController.register_client);
router.put("/editclient/:id", ClientController.edit_client);
router.delete("/deleteclient/:id", ClientController.delete_client);
router.get("/listclients", ClientController.list_clients);
router.get("/clientdetails/:id", ClientController.get_client_details);

//Books Routes
router.post("/addbook", BookController.add_book);
router.put("/editbook/:id", BookController.edit_book);
router.delete("/deletebook/:id", BookController.delete_book);
router.get("/listbooks", BookController.list_books);

//Issue Routes
router.post("/issuebook/:user/:book", IssueController.issue_book);
router.get("/issuedlist", IssueController.show_issued_books);
router.post("/returnbook/:id", IssueController.return_book);

module.exports = router;
