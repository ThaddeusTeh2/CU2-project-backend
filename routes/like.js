const express = require("express");
const { addNewLike, deleteLike } = require("../controllers/like");
const { isValidUser } = require("../middleware/auth");

const router = express.Router();

router.post("/:id", isValidUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { eType, userId } = req.body;

    const newLike = await addNewLike(userId, id, eType);
    res.status(200).send(newLike);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

router.delete("/:id", isValidUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { eType, userId } = req.query;

    const deletedLike = await deleteLike(id, eType, userId);
    res.status(200).send(deletedLike);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
