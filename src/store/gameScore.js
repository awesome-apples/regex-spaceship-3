import axios from "axios";

//ACTION TYPES
const GET_SCORE = "GET_SCORE";

//INITIAL STATE
const initialState = 0;

//ACTION CREATORS
export const getScore = (score) => ({ type: GET_SCORE, score });

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCORE:
      return action.score;
    default:
      return state;
  }
}
