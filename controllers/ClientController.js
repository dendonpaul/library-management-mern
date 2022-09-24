const ClientModel = require("../models/ClientModel");

const register_client = async (req, res) => {
  const { firstname, lastname, email, mobile, userType } = req.body;

  if (firstname == "" || lastname == "" || email == "" || mobile == "") {
    return res.status(400).json({ message: "Please fill all the fields." });
  }

  const emailExists = await ClientModel.findOne({ email });
  const mobileExists = await ClientModel.findOne({ mobile });

  if (emailExists)
    return res
      .status(400)
      .json({ message: "Email already exists. Please choose different email" });
  if (mobileExists)
    return res.status(400).json({
      message: "Mobile number already exists. Please choose different number",
    });

  const newUser = new ClientModel({
    firstname,
    lastname,
    email,
    mobile,
    userType,
  });

  newUser.save().then((user) => {
    res.status(200).json({ message: "Client Added successfully" });
  });
};

module.exports = { register_client };
