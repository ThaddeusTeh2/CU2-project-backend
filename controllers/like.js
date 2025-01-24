const Like = require("../models/like");

//add new like
const addNewLike = async (user, eId, eType) => {
  const newLike = new Like({
    user,
    eId,
    eType,
  });
  // save the new like into mongodb
  await newLike.save();
  return newLike;
};

// delete like
const deleteLike = async (id) => {
  return await Like.findByIdAndDelete(id);
};

const getLikes = async (id) => {
  return await Like.find({ eId: id });
};

// export all the functions
module.exports = {
  addNewLike,
  deleteLike,
  getLikes,
};
