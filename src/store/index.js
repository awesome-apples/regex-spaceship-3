import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import users from "./users";
import scores from "./scores";
import randomTasks from "./randomTasks";
import gameScore from "./gameScore";

const reducer = combineReducers({
  users,
  scores,
  randomTasks,
  gameScore,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
