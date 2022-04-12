import { combineReducers } from "redux";

import productReducer from "./reducers/productReducer";

const combineReducer = combineReducers({
  // userReducer: userReducer,
  productReducer: productReducer,
});

export default combineReducer;
