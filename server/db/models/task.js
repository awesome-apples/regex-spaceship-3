const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("task", {
  problem: {
    type: Sequelize.TEXT,
  },
  matchArray: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  skipArray: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  possibleSolutions: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  // difficulty: {
  //   type: Sequelize.STRING,
  // },
  // category: {
  //   type: Sequelize.STRING,
  // },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
