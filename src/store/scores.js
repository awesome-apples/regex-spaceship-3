import axios from "axios";

//ACTION TYPES
const GET_SCORES = "GET_SCORES";

//INITIAL STATE
const initialState = [];

//ACTION CREATORS
const getScores = (scores) => ({ type: GET_SCORES, scores });

//THUNK CREATORS
export const fetchScores = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/scores");
    console.log("data", data);
    dispatch(getScores(data));
  } catch (err) {
    console.error(err);
  }
};

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCORES:
      return action.scores;
    default:
      return state;
  }
}
