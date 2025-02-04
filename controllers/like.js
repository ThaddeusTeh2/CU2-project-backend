const Comment = require("../models/comment");
const Car = require("../models/car");

//add new like

//finding the car by id (eId)
const addNewLike = async (user, eId, eType) => {
  //if its a comment, find it and add its id to the list
  if (eType === "comment") {
    const comment = await Comment.findById(eId);
    //add the like to the comment's likes arr
    if (comment) {
      comment.like = [...comment.like, user];
      await comment.save();
    }

    //if its a car do the same
  } else if (eType === "car") {
    const car = await Car.findById(eId);
    if (car) {
      car.like = [...car.like, user];
      await car.save();
    }
  }
};

// delete like
const deleteLike = async (eId, eType, userId) => {
  if (eType === "comment") {
    const comment = await Comment.findById(eId);
    if (comment) {
      comment.like = comment.like.filter((id) => id.toString() !== userId);
      await comment.save();
    }
  } else if (eType === "car") {
    const car = await Car.findById(eId);
    if (car) {
      car.like = car.like.filter((id) => id.toString() !== userId);
      await car.save();
    }
  }
};

// export all the functions
module.exports = {
  addNewLike,
  deleteLike,
};
