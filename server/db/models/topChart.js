const Sequelize = require("sequelize");
const db = require("../db");

const TopChart = db.define("topchart", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  points: {
    type: Sequelize.INTEGER,
  },
  time: {
    type: Sequelize.INTEGER,
  },
  style: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["single", "multi"]],
    },
  },
  score: {
    type: Sequelize.INTEGER,
  },
});

module.exports = TopChart;
