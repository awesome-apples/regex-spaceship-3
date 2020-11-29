import axios from 'axios';

//ACTION TYPES
const GET_TASKS = 'GET_TASKS';
const GET_RANDOM_TASK = 'GET_RANDOM_TASK';

//INITIAL STATE
const initialState = [];

//ACTION CREATORS
const getTasks = (tasks) => ({ type: GET_TASKS, tasks });
const getRandomTask = (task) => ({ type: GET_RANDOM_TASK, task });

//THUNK CREATORS
//when this is called it should be called with an argument that is an object that looks like this {amount: 5}
export const fetchTasks = (numOfTasks) => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get('/api/tasks', numOfTasks);
    console.log('tasks', tasks);
    dispatch(getTasks(tasks));
  } catch (err) {
    console.error(err);
  }
};
export const fetchRandomTask = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/tasks/randomTask`);
    dispatch(getRandomTask(data));
  } catch (err) {
    console.error(err);
  }
}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks;
    case GET_RANDOM_TASK:
      return action.task;
    default:
      return state;
  }
}
