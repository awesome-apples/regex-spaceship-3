const router = require('express').Router();
const { Game, User } = require('../db/models');
module.exports = router;

//GET /api/games
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    next(err);
  }
});

//POST /api/games
router.post('/', async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.json(game);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/games/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    await game.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
