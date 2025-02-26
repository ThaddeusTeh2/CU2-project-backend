const Type = require("../models/type");

//self explanatory CRUD operations
// (findbyID supremacy :D )

const getTypes = async (sortType, search) => {
  let query = {};

  if (search && search !== "all") {
    query.$text = { $search: search };
  }

  let types = await Type.find(query).sort({ [sortType]: 1 });
  return types;
};

const getType = async (_id) => {
  const type = await Type.findById(_id);
  return type;
};

const addNewType = async (name) => {
  const newType = new Type({ name });
  await newType.save();
  return newType;
};

const updateType = async (_id, name) => {
  const updatedType = await Type.findByIdAndUpdate(
    _id,
    { name },
    { new: true }
  );
  return updatedType;
};

const deleteType = async (_id) => {
  const deletedType = await Type.findByIdAndDelete(_id);
  return deletedType;
};

module.exports = {
  getTypes,
  getType,
  addNewType,
  updateType,
  deleteType,
};
