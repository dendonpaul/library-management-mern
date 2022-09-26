const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client_datas",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books_datas",
      required: true,
    },
    returned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const IssueModel = mongoose.model("issue_datas", IssueSchema);

module.exports = IssueModel;
