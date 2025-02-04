const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getUsers,
  getUserByEmail,
  editUser,
  deleteUser,
} = require("../controllers/user");

const { isAdmin } = require("../middleware/auth");

//get all users
router.get("/users", async (req, res) => {
  try {
    const { sortType } = req.query;
    const users = await getUsers(sortType);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//get 1 user by email
router.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//update
router.put("/users/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedUser = await editUser(id, name);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//delete
router.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // login user via login function
    const user = await login(email, password);
    // send back the user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// sign up route
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // create new user via signup function
    const user = await signup(name, email, password);
    // send back the newly created user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;
