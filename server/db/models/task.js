const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define('task', {
  problem: {
    type: Sequelize.STRING,
  },
  solution: {
    type: Sequelize.STRING,
  },
  difficulty: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
});

module.exports = Task;
