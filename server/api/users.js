const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

//GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

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
router.get('/', async (req, res, next) => {
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
