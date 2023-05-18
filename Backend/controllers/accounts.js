
const Account = require("../model/accounts");

const _ = require("lodash");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenCreater = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "5d" });
};

const forLogin = async (req, res) => {
  const {  email, password } = req.body;
  try {
    const user = await Account.login(email, password);
   
      const token = tokenCreater(user.id);
      res.status(200).json({ email, token });
    
  } catch (error) {
    // res.status(400).json({error:error.message})
  }
};

const forSignup = async (req, res) => {
  const { name, email, password , mobile,gender , address  } = req.body;
  try {
    const user = await Account.signup(name, email, password,mobile,gender , address );
    const token = tokenCreater(user.id);
    res.status(200).json({ name, email, token,mobile,gender , address  });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

const createAccount = async function (req, res, next) {
  try {
    const product = new Account(req.body);
    product.save(function (err, data) {
      if (err) {
        return res.status(422).send(err);
      }
      return res.send(data);
    });
  } catch (err) {
    return res.status(422).send(err);
  }
};

const getAccounts = async function (req, res, next) {
  try {
    if (req.params.id) {
      const data = await Account.findOne({ _id: req.params.id });
      return res.send(data);
    } else {
      const data = await Account.find({});
      return res.send(data);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


const deleteAccount = async function (req, res, next) {
    try {
      const data = await Account.findByIdAndDelete(req.params.id)
      return res.send(data);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  };
  
  


const updateAccount = async function (req, res, next) {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedAccount = await Account.findByIdAndUpdate(id, { $set: body }, { new: true });

    if (!updatedAccount) {
      return res.status(404).send({ message: "Account not found" });
    }

    return res.status(200).send({ message: "Account updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};



module.exports = { getAccounts, createAccount, deleteAccount, updateAccount, forSignup, forLogin, };
