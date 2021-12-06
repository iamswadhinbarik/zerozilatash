import { SET_CART } from "../constant/cartActionType";
export const setCart = (payload) => {
  console.log(payload);
  return {
    type: SET_CART,
    payload,
  };
};
