const express = require("express");
const getOverview = require("../controllers/review");
//router
const router = express.Router();

router.get("/", async (req, res) => {
  const overview = await getOverview();
  res.status(200).send(overview);
});
module.exports = router;
