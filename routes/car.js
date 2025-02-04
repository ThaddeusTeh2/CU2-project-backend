const {
  getCars,
  getCar,
  addNewCar,
  updateCar,
  deleteCar,
  getCarsAdmin,
} = require("../controllers/car");

const { isAdmin } = require("../middleware/auth");

const express = require("express");
//router
const router = express.Router();

//name, description, type, brand, like, image

//get all
router.get("/", async (req, res) => {
  const { type, brand, sortType } = req.query;
  console.log(req.query);
  const cars = await getCars(type, brand, sortType);
  res.status(200).send(cars);
});

//get all for admin
router.get("/admin", isAdmin, async (req, res) => {
  const { sortType } = req.query;
  const cars = await getCarsAdmin(sortType);
  res.status(200).send(cars);
});

//get 1
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const car = await getCar(id);
  res.status(200).send(car);
});

// add 1 car (POST)
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;

    const description = req.body.description;
    const type = req.body.type;
    const brand = req.body.brand;
    const like = [];
    const image = req.body.image;

    // !err check
    if (!name || !description) {
      return res.status(400).send({
        error: "add data la dei",
      });
    }

    //pass data 2 addProd function
    const newCar = await addNewCar(name, description, type, brand, like, image);
    res.status(200).send(newCar);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// update car (PUT)
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const brand = req.body.brand;
    const image = req.body.image;

    const updatedCar = await updateCar(
      id,
      name,
      description,
      type,
      brand,
      image
    );
    res.status(200).send(updatedCar);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete car (DELETE)
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCar(id);
    res.status(200).send({
      message: `Car ${id} deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
