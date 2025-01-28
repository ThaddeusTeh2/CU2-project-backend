const Car = require("../models/car");
const { getLikes } = require("./like");

//get all
const getCars = async (type, brand, sortType) => {
  const cars = Car.find({
    type: type,
    brand: brand,
  }).sort({
    [sortType]: 1,
  });

  //helper func
  const processCars = async (cars) => {
    for (const car of cars) {
      const likes = await getLikes(car._id);

      car.likes = likes.length;
    }
    return cars;
  };

  processCars(cars);

  return cars;
};

//get 1 by id
const getCar = async (id) => {
  const car = Car.findById(id);

  const processCar = async (car) => {
    const likes = await getLikes(car._id);
    car.likes = likes.length;
    return car;
  };

  processCar(car);

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
const updateCar = async (id, name, description, type, brand, like, image) => {
  const updatedCar = await Car.findByIdAndUpdate(
    id,
    {
      name,
      description,
      type,
      brand,
      like,
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
};
