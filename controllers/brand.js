const Brand = require("../models/brand");

//self explanatory CRUD operations

//get all
const getBrands = async (sortType) => {
  const brands = await Brand.find().sort({
    [sortType]: 1,
  });
  return brands;
};

//get 1
const getBrand = async (_id) => {
  const brand = await Brand.findById(_id);
  return brand;
};

const addNewBrand = async (name) => {
  const newBrand = new Brand({ name });
  await newBrand.save();
  return newBrand;
};

const updateBrand = async (_id, name) => {
  const updatedBrand = await Brand.findByIdAndUpdate(
    _id,
    { name },
    { new: true }
  );
  return updatedBrand;
};

const deleteBrand = async (id) => {
  const deletedBrand = await Brand.findByIdAndDelete(id);
  return deletedBrand;
};

module.exports = {
  getBrands,
  getBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
};
