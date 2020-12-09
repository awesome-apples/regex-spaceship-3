const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define('task', {
  problem: {
    type: Sequelize.TEXT,
  },
  string: {
    type: Sequelize.TEXT,
  },
  hint: {
    type: Sequelize.STRING,
  },
  expectedOutput: {
    type: Sequelize.TEXT,
  },
  possibleSolution: {
    type: Sequelize.STRING,
  },
  callback: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  nickname: {
    type: Sequelize.STRING,
  },
});

module.exports = Task;
