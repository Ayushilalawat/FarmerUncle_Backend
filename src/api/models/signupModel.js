const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  is_deleted:{type:Boolean,default:0,required:false}
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password,10);
  }

  next();
});

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     const match = await bcrypt.compare(candidatePassword, this.password);
//     console.log('Password Match:', match);
//     return match;
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     return false;
//   }
// };

// Method to generate a token for authentication
// userSchema.methods.generateToken = async function () {
//   const secretKey = await process.env.JWT_SECRET||'xyz';
//   return jwt.sign({ _id: this._id }, secretKey, { expiresIn: '1h' });
// };

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
