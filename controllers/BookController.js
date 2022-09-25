const req = require("express/lib/request");
const BooksModel = require("../models/BooksModel");

const add_book = async (req, res) => {
  const saveBook = new BooksModel(req.body);

  await saveBook.save((err) => {
    if (err) {
      return res.send("All fields required");
    }
    return res.send("success");
  });
};

const edit_book = async (req, res) => {
  const { id } = req.params;
  try {
    const updateBook = await BooksModel.findByIdAndUpdate(
      { _id: id },
      req.body
    );

    if (!updateBook) return res.send("Not updated");

    return res.send("Editted sucesfuly");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const delete_book = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBook = await BooksModel.deleteOne({ _id: id });
    if (!deleteBook) return res.send(" Book Not deleted :(");

    return res.status(200).json({ message: "Book Deleted Successfully." });
  } catch (err) {
    return res.send(err);
  }
};

const list_books = async (req, res) => {
  try {
    const allBooks = await BooksModel.find({});

    if (!allBooks) return res.send("Failed to Find books");

    return res.status(200).json({ data: allBooks });
  } catch (err) {
    return res.send(err);
  }
};

module.exports = { add_book, edit_book, delete_book, list_books };
