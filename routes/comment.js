const express = require("express");
const {
  addNewComment,
  editComment,
  deleteComment,
  getComments,
  getAllComments,
  getCommentById,
} = require("../controllers/comment");
const { isValidUser } = require("../middleware/auth");

const router = express.Router();

//make comment
router.post("/:carId", isValidUser, async (req, res) => {
  try {
    const { carId } = req.params;
    const { content, userId } = req.body;

    if (!carId || !userId || !content) {
      return res.status(400).send({
        error: "all fields must be filled",
      });
    }

    const newComment = await addNewComment(userId, carId, content);
    res.status(200).send(newComment);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

//get all comments
router.get("/", async (req, res) => {
  try {
    const { sortType } = req.query;
    const comments = await getAllComments(sortType);

    console.log(sortType);

    if (!comments.length) {
      return res.status(404).send({ error: "xde comments" });
    }

    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to get comments" });
  }
});

//get comment from car
router.get("/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const { sortType } = req.query;
    const comments = await getComments(carId, sortType);
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// edit
router.put("/:commentId", isValidUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const updatedComment = await editComment(commentId, content);
    res.status(200).send(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error,
    });
  }
});

router.delete("/:commentId", isValidUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, userRole } = req.body;

    const deletedComment = await deleteComment(commentId, userId, userRole);
    if (!deletedComment) {
      return res.status(400).send({
        error: "failed to delete comment",
      });
    }
    res.status(200).send(deletedComment);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
