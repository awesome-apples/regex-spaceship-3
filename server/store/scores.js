import axios from "axios";

//ACTION TYPES
const GET_SCORES = "GET_SCORES";

//INITIAL STATE
const initialState = [];

//ACTION CREATORS
const getScores = (scores) => ({ type: GET_SCORES, scores });

//THUNK CREATORS
export const fetchScore = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/scores");
    console.log("data", data);
    dispatch(getPlayers(data));
  } catch (err) {
    console.error(err);
  }
};
