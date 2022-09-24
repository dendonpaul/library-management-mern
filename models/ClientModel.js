const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "student",
  },
});

const ClientModel = new mongoose.model("client_datas", ClientSchema);

module.exports = ClientModel;
