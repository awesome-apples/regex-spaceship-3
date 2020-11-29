const router = require('express').Router();
const { Task } = require('../db/models');
module.exports = router;

//GET /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);

    // const { amount } = req.body;
    // const tasks = [];
    // for (i = 0; i < amount; i++) {
    //   //I have hardcoded it to pick a random number btw 1-3 because I seeded 3 dummy tasks, but this number should be changed later on
    //   const randomId = Math.ceil(Math.random() * 3);
    //   const task = await Task.findByPk(randomId);
    //   tasks.push(task);
    // }
    // res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// get 1 random task?
router.get('/randomTasks', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    const randomIdOne = Math.ceil(Math.random() * tasks.length);
    const randomIdTwo = Math.ceil(Math.random() * tasks.length);
    const taskOne = await Task.findByPk(randomIdOne);
    const taskTwo = await Task.findByPk(randomIdTwo);
    res.json([taskOne, taskTwo]);
  } catch (err) {
    next(err);
  }
})