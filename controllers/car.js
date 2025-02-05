const Car = require("../models/car");

//get all
const getCars = async (type, brand, sortType, search) => {
  let query = {};

  if (type && type !== "all") query.type = type;
  if (brand && brand !== "all") query.brand = brand;

  if (search && search !== "all") {
    query.$text = { $search: search };
  }

  let cars = await Car.find(query).sort({ [sortType]: 1 });
  return cars;
};

const getCarsOverview = async () => {
  const cars = await Car.find();

  return cars;
};

const getCarsAdmin = async (sortType) => {
  const cars = await Car.find().sort({
    [sortType]: 1,
  });
  return cars;
};

//get 1 by id
const getCar = async (id) => {
  const car = await Car.findById(id);

  // const processCar = async (car) => {
  //   const likes = await getLikes(car._id);
  //   car.likes = likes.length;
  //   return car;
  // };

  // const updatedCar = await processCar(car);
  // console.log(updatedCar);
  return car;
};

//add new car
const addNewCar = async (name, description, type, brand, like, image) => {
  const newCar = await Car.create({
    name,
    description,
    type,
    brand,
    like,
    image,
  });
  // save the new car into mongodb
  return newCar;
};
//update car
const updateCar = async (id, name, description, type, brand, image) => {
  const updatedCar = await Car.findByIdAndUpdate(
    id,
    {
      name,
      description,
      type,
      brand,
      image,
    },
    //stupid thing you need to get the latest data
    { new: true }
  );
  return updatedCar;
};

// delete car
const deleteCar = async (id) => {
  return await Car.findByIdAndDelete(id);
};

// export all the functions
module.exports = {
  addNewCar,
  updateCar,
  deleteCar,
  getCars,
  getCar,
  getCarsAdmin,
  getCarsOverview,
};
