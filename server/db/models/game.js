const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  code: {
    type: Sequelize.INTEGER,
  },
  socketId: {
    type: Sequelize.STRING,
  },
  numOfTasks: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
});

module.exports = Game;
