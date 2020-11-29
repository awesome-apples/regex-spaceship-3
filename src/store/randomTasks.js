import axios from 'axios';

//ACTION TYPES
// const GET_TASKS = 'GET_TASKS';
const GET_RANDOM_TASKS = 'GET_RANDOM_TASKS';

//ACTION CREATORS
// const getTasks = (tasks) => ({ type: GET_TASKS, tasks });
const getRandomTasks = (tasks) => ({ type: GET_RANDOM_TASKS, tasks });

// //THUNK CREATORS
// //when this is called it should be called with an argument that is an object that looks like this {amount: 5}
// export const fetchTasks = (numOfTasks) => async (dispatch) => {
//   try {
//     const { data: tasks } = await axios.get('/api/tasks', numOfTasks);
//     console.log('tasks', tasks);
//     dispatch(getTasks(tasks));
//   } catch (err) {
//     console.error(err);
//   }
// };
export const fetchRandomTasks = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/tasks/randomTasks`);
    dispatch(getRandomTasks(data));
  } catch (err) {
    console.error(err);
  }
}

//INITIAL STATE
const initialState = [];

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_TASKS:
    //   return action.tasks;
    case GET_RANDOM_TASKS:
      return action.tasks;
    default:
      return state;
  }
}
