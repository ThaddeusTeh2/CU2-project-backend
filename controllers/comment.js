const Comment = require("../models/comment");
const { getLikes } = require("./like");

//add new comment
const addNewComment = async (user, car, content) => {
  const newComment = new Comment({
    user,
    car,
    content,
  });
  // save the new comment into mongodb
  await newComment.save();
  return newComment;
};

const getCommentById = async (commentId) => {
  return await Comment.findById(commentId);
};

// update
const editComment = async (commentId, content) => {
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      content: content,
    },
    //stupid thing you need to get the latest data
    { new: true }
  );

  return comment;
};

// delete comment
const deleteComment = async (id, userId, userRole) => {
  if (userRole === "admin") {
    return await Comment.findByIdAndDelete(id);
  } else {
    const comment = await Comment.findById(id).populate("user");
    if (comment.user._id === userId) {
      return await Comment.findByIdAndDelete(id);
    }
  }
};
//get all comments
const getAllComments = async (sortType) => {
  const comments = await Comment.find()
    .sort({
      [sortType]: 1,
    })
    .populate("user")
    .populate("car");

  console.log(comments);

  return comments;
};

//get comments (frm a specific car)
const getComments = async (id, sortType) => {
  //get all comments from the certain carId
  const comments = await Comment.find({ car: id })
    .sort({
      [sortType]: 1,
    })
    .populate("user");

  return comments;
};

// export all the functions
module.exports = {
  addNewComment,
  deleteComment,
  editComment,
  getComments,
  getAllComments,
  getCommentById,
};
