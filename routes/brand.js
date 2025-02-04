// routes/brands.js
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  getBrands,
  getBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand");

const { isAdmin } = require("../middleware/auth");

// get all brands
router.get("/", async (req, res) => {
  try {
    const { sortType } = req.query;
    const brand = await getBrands(sortType);
    res.status(200).json(brand);
  } catch (err) {
    res.status(400).send({ error: "err fetching brand: " + err.message });
  }
});

// get 1 brand
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Brands.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `ID format not valid bro: "${id}", valid MongoDB ObjectId required.`,
      });
    }
    const brand = await getBrand(id);
    if (brand) {
      res.status(200).send(brand);
    } else {
      res.status(400).send("cant find brand D:");
    }
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add new brand
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).send({
        error: "no name",
      });
    }
    const newBrand = await addNewBrand(name);
    res.status(200).send(newBrand);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// update brand
router.put("/:id", isAdmin, async (req, res) => {
  try {
    // get id frm URL
    const id = req.params.id;
    const name = req.body.name;
    // pass in data into updateBrand func
    const updatedBrand = await updateBrand(id, name);
    res.status(200).send(updatedBrand);
  } catch (error) {
    // err? return error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete brand
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await getBrand(id);
    // if brand does not exist
    if (!brand) {
      /* !brand because it is returning either a single object or null */
      return res.status(404).send({
        error: `error: no match for a brand found with id "${id}".`,
      });
    }
    // trigger delete brand function
    await deleteBrand(id);
    res.status(200).send({
      message: `brand with id: #${id} deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
