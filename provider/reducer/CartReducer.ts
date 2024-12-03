import { CartProductInfo, CartType } from "@/lib/types";

export type CartReducerState = {
  cart: CartType;
  totalPrice: number;
};

export type CartReducerAction = {
  type: "ADD_TO_CART" | "REMOVE_FROM_CART" | "CLEAR_CART" | "SET_CART";
  payload: {
    cart: CartType;
    totalPrice: number;
  };
};

export const CartReducer = (
  state: CartReducerState,
  action: CartReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
    case "REMOVE_FROM_CART":
    case "CLEAR_CART":
    case "SET_CART":
      return {
        ...state,
        cart: payload.cart,
        totalPrice: payload.totalPrice,
      };
    default:
      throw new Error("gaada reducer yang beginii");
  }
};
