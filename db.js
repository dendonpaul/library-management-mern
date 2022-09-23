const mongoose = require("mongoose");

const Connection = () => {
  try {
    mongoose
      .connect(process.env.DB_CONNECT, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB Connected"));
  } catch (err) {
    console.log(err);
  }
};

module.exports = Connection;
