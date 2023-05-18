const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// accounts schema
const accountSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: { type: String },
});

accountSchema.statics.signup = async function 
(
  name,
  email,
  password,
  mobile,
  gender,
  address
) {
  if (!name || !email || !password || !mobile || !address || !gender) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
    
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    mobile,
    gender,
    address,
  });

  return user;
};

accountSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
