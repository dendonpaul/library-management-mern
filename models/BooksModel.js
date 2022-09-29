const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "--Not Available--",
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    cat: {
      type: String,
      enum: [
        "Romance",
        "Technology",
        "CS",
        "Management",
        "Physics",
        "Chemistry",
      ],
      required: true,
    },
    copies: {
      type: Number,
      min: 1,
      max: 1000,
      required: true,
    },
  },
  { timestamps: true }
);

const BooksModel = mongoose.model("books_datas", BooksSchema);

module.exports = BooksModel;
