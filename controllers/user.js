//imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//get all users
const getUsers = async (sortType) => {
  const users = await User.find().sort({
    [sortType]: 1,
  });
  return users;
};

// get user by email
async function getUserByEmail(email) {
  return await User.findOne({ email });
}

// generate JWT token
function generateJWTtoken(_id, name, email, role) {
  return jwt.sign(
    {
      _id,
      name,
      email,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );
}

//FUNC

//LOGIN
const login = async (email, password) => {
  // email exists?
  const user = await User.findOne({
    email,
  });
  // if not exist, throw error
  if (!user) {
    throw new Error("this email is not registered");
  }

  // exist? compare password
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("wrong password");
  }

  // generate JWT token
  const token = generateJWTtoken(user._id, user.name, user.email, user.role);

  // password correct?, return user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

//SIGNUP
const signup = async (name, email, password) => {
  // email exist?
  const emailExists = await User.findOne({
    email,
  });
  // if email exists in the collection
  if (emailExists) {
    throw new Error("email taken");
  }

  // create user
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 69),
  });

  // save user
  await newUser.save();

  // generate jwt token
  const token = generateJWTtoken(
    newUser._id,
    newUser.name,
    newUser.email,
    newUser.role
  );

  // return the user data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token,
  };
};

const editUser = async (_id, name) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { name },
    { new: true }
  );
  return updatedUser;
};

//delete user
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  login,
  signup,
  getUsers,
  getUserByEmail,
  editUser,
  deleteUser,
};
