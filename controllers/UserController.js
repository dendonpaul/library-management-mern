const {
  UserModel,
  validate_register,
  validate_login,
} = require("../models/UserModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const register_user = async (req, res) => {
  try {
    const { error } = validate_register(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { firstname, lastname, email, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "User Already Exists" });
    }

    const newUser = new UserModel({ firstname, lastname, email, password });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) console.log(err);
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json({ message: "User Created Successfully." }));
      });
    });
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: err });
  }
};

const login_user = async (req, res) => {
  try {
    const { error } = validate_login(req.body);
    if (error) return res.send(error.details[0].message);

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Email/Password" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json({ message: "Invalid Email/Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register_user, login_user };
