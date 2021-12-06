import { SET_CART } from "../constant/cartActionType";
const initialState = {
  inCart: [],
  inCart1: 17,
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CART:
      console.log("inCart", state.inCart);
      console.log("payload", payload);

      return { ...state, inCart: payload };
    default:
      return state;
  }
};
