const UserModel = require('../models/signupModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const argon2 = require('argon2');

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await UserModel.findOne({ email });
    if (!userData) {
      return res.status(401).send("Invalid Email or Password");
    }
    const dbPassword = userData.password;
    // Using Argon2 for password comparison
    const passwordIsValid = await argon2.verify(dbPassword, password);
    if (passwordIsValid) {
      const token = userData.generateAuthToken();
      res.cookie('auth', token, { httpOnly: true }).json({
        'User Signed In': "Successfully",
        'Authorization': `Bearer ${token}`,
        'userId': userData._id,
      });
    } else {
      res.status(401).send("Invalid Email or Password");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server error");
  }
};



// exports.signin = async (req, res) => {
  
//   // try {
//   //   const userData = await UserModel.findOne({email: req.body.email });
//   //   if (!userData) {
//   //     return res.status(401).send("Invalid Email or Password");
//   //   }
//   //   const passwordIsValid = await userData.comparePassword(req.body.password);
//   //   console.log('Password Valid:', passwordIsValid);
//   //   if (!passwordIsValid) {
//   //     return res.status(401).send({ auth: false, token: null });
//   //   }
//   //   const token = userData.generateToken();
//   //   console.log('Decoded Token:', jwt.verify(token, process.env.JWT_SECRET));
//   //   res.cookie('auth', token, { httpOnly: true }).json({
//   //     auth: true,
//   //     token: token,
//   //     userId: userData._id,
//   //   });
//   // } 
//   // catch (e) {
//   //   console.log(e);
//   //   res.status(500).send("Internal Server Error");
//   // }
// };