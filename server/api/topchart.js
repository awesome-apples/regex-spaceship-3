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
      const aScore = a.time - a.points;
      const bScore = b.time - b.points;
      return aScore - bScore;
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
      const aScore = a.time - a.points;
      const bScore = b.time - b.points;
      return aScore - bScore;
    });
    res.json(topcharts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, points, time, style } = req.body;
    // const userId = req.user.dataValues.id;
    const newchart = await TopChart.create({ name, points, time, style });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
