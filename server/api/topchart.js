const router = require("express").Router();
const { TopChart } = require("../db/models");
const Sequelize = require("sequelize");
module.exports = router;

// GET /api/orders/cart
// this is to return a cart of products that belongs to one user in cart component
router.get("/single", async (req, res, next) => {
  try {
    const topcharts = await TopChart.findAll({
      where: {
        style: "single",
      },
    });
    topcharts.sort((a, b) => {
      return a.score - b.score;
    });
    res.json(topcharts);
  } catch (error) {
    next(error);
  }
});

router.get("/multi", async (req, res, next) => {
  try {
    const topcharts = await TopChart.findAll({
      where: {
        style: "multi",
      },
    });
    topcharts.sort((a, b) => {
      return a.score - b.score;
    });
    res.json(topcharts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, points, time, style, score } = req.body;
    const newchart = await TopChart.create({
      name,
      points,
      time,
      style,
      score,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
