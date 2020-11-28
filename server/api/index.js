const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));
router.use('/games', require('./games'));
router.use('/scores', require('./scores'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
