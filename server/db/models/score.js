const Sequelize = require('sequelize');
const db = require('../db');

const Score = db.define('score', {
  points: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});

module.exports = Score;
