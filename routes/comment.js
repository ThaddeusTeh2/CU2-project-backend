const express = require("express");
const {
  addNewComment,
  deleteComment,
  getComments,
} = require("../controllers/comment");
const { isValidUser } = require("../middleware/auth");

const router = express.Router();

router.post("/:carId", isValidUser, async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.user._id;
    const { content } = req.body;

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

router.get("/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const { sortType } = req.body;
    const comments = await getComments(carId, sortType);
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

router.delete("/:commentID", isValidUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(400).send({
        error: "cant find comment",
      });
    }
    const deletedComment = await deleteComment(commentId);
    if (!deletedComment) {
      return res.status(500).send({
        error: "failed to delete comment",
      });
    }
    res.status(200).send(deletedComment);
  } catch (error) {}
});

module.exports = router;
