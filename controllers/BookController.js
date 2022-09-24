const req = require("express/lib/request");
const BooksModel = require("../models/BooksModel");

const add_book = async (req, res) => {
  const saveBook = new BooksModel(req.body);

  saveBook.save((err) => {
    if (err) {
      return res.send("All fields required");
    }
    return res.send("success");
  });
};

module.exports = { add_book };
