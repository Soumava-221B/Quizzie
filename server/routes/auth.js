const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

//User Collection from data base
const User = require("../db_models/user.model");

//Register Route

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Checking all the fields are mandatory
    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    //mongoose method to find the user with unique email
    const userExists = await User.findOne({ email });

    //Checking if user already exists
    if (userExists) {
      return res.status(409).json({ message: "User already registered" });
    }

    //encrypted password to store in db
    const encPassword = await bcrypt.hash(password, 10);

    //creating the user filled data when user is not present
    const user = await User.create({ name, email, password: encPassword });

    //token generated
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    //return success message
    res.status(200).json({
      message: "Sign up successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //if anyone of the field is empty then return
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //finding the data with the help of email user entered
    const user = await User.findOne({ email });

    //if user not present
    if (!user) {
      return res.status(403).json({
        message: "Please Sign up first!",
      });
    }

    //if user present then checking the password is correct or not
    const passMatched = await bcrypt.compare(password, user.password);

    //if password is not correct
    if (!passMatched) {
      return res.status(401).json({
        message: "Incorrect Password!!",
      });
    }

    //token generated
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    //sending response after successfull login
    res.status(200).json({
      message: "Logged in successfully!!",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
