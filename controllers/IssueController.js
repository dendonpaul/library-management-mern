const IssueModel = require("../models/IssueModel");
const BooksModel = require("../models/BooksModel");

const issue_book = async (req, res) => {
  const { user, book } = req.params;

  try {
    const issueBook = await IssueModel.create({
      client: user,
      book: book,
    });

    if (!issueBook) return res.send("error");

    const bookId = issueBook.book._id;
    //reduce book qty in books model
    const reduceBook = await BooksModel.findByIdAndUpdate(bookId, {
      $inc: { copies: -1 },
    });

    return res.status(200).json(issueBook);
  } catch (err) {
    return res.send(err);
  }
};

const show_issued_books = async (req, res) => {
  try {
    const issuedBooks = await IssueModel.find({})
      .populate("book")
      .populate("client");
    if (!issuedBooks) return res.send("error");

    return res.status(200).json(issuedBooks);
  } catch (err) {
    return res.send(err);
  }
};

module.exports = { issue_book, show_issued_books };
