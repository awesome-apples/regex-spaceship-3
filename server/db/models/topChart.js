const Sequelize = require("sequelize");
const db = require("../db");

const TopChart = db.define("topchart", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  points: {
    type: Sequelize.INTEGER,
  },
  time: {
    type: Sequelize.DECIMAL(20, 2),
  },
  style: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["single", "multi"]],
    },
  },
});

module.exports = TopChart;
