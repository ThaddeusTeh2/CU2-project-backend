const express = require("express");
const { addNewLike, deleteLike } = require("../controllers/like");
const { isValidUser } = require("../middleware/auth");

const router = express.Router();

router.post("/:id", isValidUser, async (req, res) => {
  try {
    const { eId } = req.params;
    const userId = req.user._id;
    const { eType } = req.body;

    const newLike = await addNewLike(userId, eId, eType);
    res.status(200).send(newLike);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

router.delete("/:likeId", isValidUser, async (req, res) => {
  try {
    const { likeId } = req.params;
    if (!likeId) {
      return res.status(400).send({
        error: "cant find like",
      });
    }
    const deletedLike = await deleteLike(likeId);
    if (!deletedLike) {
      return res.status(500).send({
        error: "failed to delete like",
      });
    }
    res.status(200).send(deletedLike);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
