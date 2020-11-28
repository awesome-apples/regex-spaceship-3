import axios from 'axios';

//ACTION TYPES
const ADD_PLAYER = 'ADD_PLAYER';
const GET_GAME_PLAYERS = 'GET_GAME_PLAYERS';

//INITIAL STATE
const initialState = [];

//ACTION CREATORS

const addPlayer = (player) => ({ type: ADD_PLAYER, player });

const getGamePlayers = (players) => ({ type: GET_GAME_PLAYERS, players });

//THUNK CREATORS

export const postPlayer = (playerInfo) => async (dispatch) => {
  try {
    const player = await axios.post('/api/users/signup', playerInfo);
    dispatch(addPlayer(player));
  } catch (error) {
    console.error(error);
  }
};

export const fetchGamePlayers = (gameId) => async (dispatch) => {
  try {
    const { data: players } = await axios.get(`/api/users/${gameId}`);
    console.log('players', players);
    dispatch(getGamePlayers(players));
  } catch (err) {
    console.error(err);
  }
};

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    //do we ever need a store that gets all players?
    case ADD_PLAYER:
      state.push(action.player);
      return state;
    case GET_GAME_PLAYERS:
      return action.players;
    default:
      return state;
  }
}
