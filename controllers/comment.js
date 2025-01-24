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

// delete comment
const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

//get comments
const getComments = async (id, sortType) => {
  //get all comments from the certain carId
  const comments = await Comment.find({ carId: id }).sort({
    [sortType]: 1,
  });

  // helper function
  const processComments = async (comments) => {
    // loop through each of the comments

    /*
     comment of comments is shorthand for

     for(let i = 0; i < comments.length; i++){
     let comment = comments[i]
    }
    */

    for (const comment of comments) {
      // get all the likes for each comment
      const likes = await getLikes(comment._id);
      // set the comment.likes based on the model to the likes that we got
      comment.likes = likes.length;
    }
    return comments;
  };

  processComments(comments);

  return comments;
};

// export all the functions
module.exports = {
  addNewComment,
  deleteComment,
  getComments,
};
