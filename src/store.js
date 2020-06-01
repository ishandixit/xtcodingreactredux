import { createStore, combineReducers } from "redux";
import CircularJSON from 'circular-json';
import user from "./reducers/userReducer";

const reducers = combineReducers({
  user
});
const getData=localStorage.getItem("state");
const persistedStorage = localStorage.getItem("state")?JSON.parse(getData):{};

const store = createStore(
  reducers,
  persistedStorage,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("state", CircularJSON.stringify(store.getState()));
});
export default store;
