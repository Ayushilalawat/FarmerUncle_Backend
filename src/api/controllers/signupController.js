const UserModel = require('../models/signupModel');
const argon2 = require('argon2');
require('dotenv').config();


exports.signup = async (req, res) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password);


    const savedUser = await UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    }).save();

    if (savedUser) {
      res.status(200).send("User created successfully");
      console.log(req.body);
    }
  } catch (err) {
    console.log("Error occurred while saving users:", err);
    res.status(500).send("Internal Server Error");
  }
};
