const router = require('express').Router();
const { Score, User } = require('../db/models');
module.exports = router;

//GET /api/scores
router.get('/', async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      include: User,
      order: [['points', 'DESC']],
    });
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

//POST /api/scores
router.post('/', async (req, res, next) => {
  try {
    const score = await Score.create(req.body);
    res.json(score);
  } catch (err) {
    next(err);
  }
});
