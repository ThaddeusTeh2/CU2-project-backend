const express = require("express");
const {
  addNewComment,
  deleteComment,
  getComments,
  getAllComments,
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
    const comments = await getAllComments();

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

router.delete("/:commentId", isValidUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, userRole } = req.body;
    if (!commentId) {
      return res.status(400).send({
        error: "cant find comment",
      });
    }
    const deletedComment = await deleteComment(commentId, userId, userRole);
    if (!deletedComment) {
      return res.status(400).send({
        error: "failed to delete comment",
      });
    }
    res.status(200).send(deletedComment);
  } catch (error) {}
});

module.exports = router;
