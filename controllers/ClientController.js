const ClientModel = require("../models/ClientModel");

//Check if email exists function
const checkEmailExists = async (email) => {
  const email2 = await ClientModel.find({ email });
  email2.map((res) => {
    console.log(res.email);
    if (res.email === email) {
      return true;
    } else {
      return false;
    }
  });
};

//Check if mobile exists function
const checkMobileExists = async (mobile) =>
  await ClientModel.findOne({ mobile });

const register_client = async (req, res) => {
  const { firstname, lastname, email, mobile, userType } = req.body;

  if (firstname == "" || lastname == "" || email == "" || mobile == "") {
    return res.status(400).json({ message: "Please fill all the fields." });
  }

  const emailExists = await ClientModel.find({ email });
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

const edit_client = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, mobile, userType } = req.body;
  try {
    //check if email exists
    // if (!checkEmailExists(email)) {
    //   return res.json({ message: "Email Already Exists" });
    // }
    // await checkMobileExists(mobile);
    // if (checkMobileExists(mobile)) {
    //   return res.send({ message: "Mobile already exists" });
    // }

    const updateClient = await ClientModel.findByIdAndUpdate(
      { _id: id },
      {
        firstname,
        lastname,
        email,
        mobile,
        userType,
      }
    );

    if (!updateClient) return res.status(400).json({ message: "edit failed" });

    return res.status(200).json({ message: "Saved Successfully" });
  } catch (err) {
    return res.send({ message: err });
  }
};

const delete_client = async (req, res) => {
  const { id } = req.params;

  const deleteClient = await ClientModel.deleteOne({ _id: id });

  if (!deleteClient) return res.status(400).json({ message: "Delete Failed" });

  return res.status(200).json({ message: "Client Delete Successfully" });
};

const list_clients = async (req, res) => {
  try {
    const allClients = await ClientModel.find({});
    if (!allClients) return res.send("Failed to fetch details of Clients");

    return res.status(200).json(allClients);
  } catch (err) {
    return res.send(err);
  }
};

const get_client_details = async (req, res) => {
  const { id } = req.params;

  try {
    const getDetails = await ClientModel.find({ _id: id });
    if (!getDetails) return res.send("errrrr");

    return res.status(200).json(getDetails);
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  register_client,
  edit_client,
  delete_client,
  list_clients,
  get_client_details,
};
