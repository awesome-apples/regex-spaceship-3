import axios from 'axios';

//ACTION TYPES
const GET_SCORES = 'GET_SCORES';
const POST_SCORE = 'POST_SCORE';

//INITIAL STATE
const initialState = [];

//ACTION CREATORS
const getScores = (scores) => ({ type: GET_SCORES, scores });

const scorePosted = (score) => ({
  type: POST_SCORE,
  score,
});

//THUNK CREATORS
export const fetchScores = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/scores');
    console.log('data', data);
    dispatch(getScores(data));
  } catch (err) {
    console.error(err);
  }
};

export const postScore = (scoreObj) => async (dispatch) => {
  try {
    const score = await axios.post('/api/scores', scoreObj);
    dispatch(scorePosted(score));
  } catch (error) {
    console.error(error);
  }
};

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCORES:
      return action.scores;
    case POST_SCORE:
      state.push(action.score);
      return state;
    default:
      return state;
  }
}
