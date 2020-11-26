import axios from "axios";

//ACTION TYPES
const GET_TASKS = "GET_TASKS";

//INITIAL STATE
const initialState = [];

//ACTION CREATORS
const getTasks = (tasks) => ({ type: GET_TASKS, tasks });

//THUNK CREATORS
export const fetchTasks = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/tasks");
    console.log("data", data);
    dispatch(getPlayers(data));
  } catch (err) {
    console.error(err);
  }
};
