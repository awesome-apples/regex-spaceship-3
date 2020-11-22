const router = require("express").Router();
const { TopChart, User } = require("../db/models");
const Sequelize = require("sequelize");
module.exports = router;

router.get("/single", async (req, res, next) => {
  try {
    const topcharts = await TopChart.findAll({
      include: [{ model: User }],
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
    const { username, points, time, style, score } = req.body;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    const newchart = await TopChart.create({
      points,
      time,
      style,
      score,
      userId: user.id,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
