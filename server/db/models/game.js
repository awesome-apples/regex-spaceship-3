const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  code: {
    type: Sequelize.INTEGER,
  },
  socketId: {
    type: Sequelize.STRING,
  },
});

module.exports = Game;
