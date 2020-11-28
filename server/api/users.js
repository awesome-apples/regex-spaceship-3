const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

//POST /api/users/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({
      username,
      password,
    });
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:gameId
router.get('/:gameId', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        gameId: req.params.gameId,
      },
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
