import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
export const allReducers = combineReducers({
  cartReducer,
});
