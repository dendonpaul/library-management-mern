const req = require("express/lib/request");
const BooksModel = require("../models/BooksModel");

const add_book = async (req, res) => {
  const saveBook = new BooksModel(req.body);

  await saveBook.save((err) => {
    if (err) {
      const isbn = err ? err.keyValue.isbn : "";
      const name = err ? err.keyValue.name : "";
      if (isbn != "" || name != "") {
        if (isbn && name) {
          return res.json({ message: `${isbn} and ${name} already exists` });
        } else if (isbn) {
          return res.json({ message: `${isbn}  already exists` });
        } else if (name) {
          return res.json({ message: `${name}  already exists` });
        }
      }
      // isbn && res.json({ message: `${isbn} already exists` });
      // name && res.json({ message: `${name} already exists` });

      return res.send(err);
    }
    return res.json({ message: "success" });
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

//list all books
const list_books = async (req, res) => {
  try {
    const allBooks = await BooksModel.find({});

    if (!allBooks) return res.send("Failed to Find books");

    return res.status(200).json({ data: allBooks });
  } catch (err) {
    return res.send(err);
  }
};

//list books with min 1 qty
const list_books_with_qty = async (req, res) => {
  try {
    const allBooks = await BooksModel.find({ copies: { $gte: 1 } }).exec();
    console.log(allBooks);

    if (!allBooks) return res.send("Failed to Find books");

    return res.status(200).json({ data: allBooks });
  } catch (err) {
    return res.send(err);
  }
};

const get_categories = async (req, res) => {
  try {
    const categories = await BooksModel.schema.path("cat").enumValues;
    res.send(categories);
  } catch (err) {
    return res.send(err);
  }
};

const get_details = async (req, res) => {
  const { id } = req.params;
  try {
    const bookDetails = await BooksModel.findOne({ _id: id });
    if (!bookDetails) return res.send("No book Found");

    return res.status(200).json({ message: bookDetails });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  add_book,
  edit_book,
  delete_book,
  list_books,
  get_categories,
  get_details,
  list_books_with_qty,
};
