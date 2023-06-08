const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// register new user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all the fields.",
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // save new user
    const user = new userModel({ username, email, password: hashPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New user created.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in registering user",
      success: false,
      error,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All Users data",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting users.",
      error,
    });
  }
};

// login controller
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Logged in successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login.",
      error,
    });
  }
};
