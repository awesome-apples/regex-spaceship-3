import axios from "axios";

//ACTION TYPES
const GET_PLAYERS = "GET_PLAYERS";

//INITIAL STATE
const initialState = [];

//ACTION CREATORS
const getPlayers = (players) => ({ type: GET_PLAYERS, players });

//THUNK CREATORS
export const fetchPlayers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/players");
    console.log("data", data);
    dispatch(getPlayers(data));
  } catch (err) {
    console.error(err);
  }
};

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PLAYERS:
      return action.players;
    default:
      return state;
  }
}
