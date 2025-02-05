// routes/types.js
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  getTypes,
  getType,
  addNewType,
  updateType,
  deleteType,
} = require("../controllers/type");

const { isAdmin } = require("../middleware/auth");

// get all types
router.get("/", async (req, res) => {
  try {
    const { sortType, search } = req.query;
    const type = await getTypes(sortType, search);
    res.status(200).send(type);
  } catch (err) {
    res.status(400).send({ error: "error fetching type: " + err.message });
  }
});

// get one type
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `not a valid ID format bro: "${id}", valid MongoDB ObjectId required.`,
      });
    }
    const type = await getType(id);
    if (type) {
      res.status(200).send(type);
    } else {
      res.status(400).send("cant find type");
    }
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add new type
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).send({
        error: "Error: Error",
      });
    }
    const newType = await addNewType(name);
    res.status(200).send(newType);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// update type
router.put("/:id", isAdmin, async (req, res) => {
  try {
    // get id frm URL
    const id = req.params.id;
    const name = req.body.name;
    // pass in data into updateType func
    const updatedType = await updateType(id, name);
    res.status(200).send(updatedType);
  } catch (error) {
    // err? return error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete type
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    // validate ID format before querying database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `not a valid ID format bro: "${id}", valid MongoDB ObjectId required.`,
      });
    }
    const type = await getType(id);
    // if type does not exist
    if (!type) {
      /* !type because it is returning either a single object or null */
      return res.status(404).send({
        error: `error: no match for a type found with id "${id}".`,
      });
    }
    // trigger delete type function
    await deleteType(id);
    res.status(200).send({
      message: `type with id: #${id} deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
