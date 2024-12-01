import { CartProductInfo } from "@/lib/types";

export type CartReducerState = {
  cartList: CartProductInfo[];
  totalPrice: number;
};

export type CartReducerAction = {
  type: "ADD_TO_CART" | "REMOVE_FROM_CART" | "CLEAR_CART";
  payload: {
    cartList: CartProductInfo[];
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
      return {
        ...state,
        cartList: payload.cartList,
        totalPrice: payload.totalPrice,
      };
    default:
      throw new Error("gaada reducer yang beginii");
  }
};
