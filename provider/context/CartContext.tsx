"use client";

import { createContext, useContext, useReducer } from "react";
import { CartReducer } from "../reducer/CartReducer";
import { CartProductInfo } from "@/lib/types";

type CartContextType = {
  cartList: CartProductInfo[];
  totalPrice: number;
  addToCart: (product: CartProductInfo) => void;
  removeFromCart: (product: CartProductInfo) => void;
  clearCart: () => void;
};

const defaultValue: CartContextType = {
  cartList: [] as CartProductInfo[],
  totalPrice: 0 as number,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultValue);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, defaultValue);

  function addToCart(product: CartProductInfo) {
    const newCartList = state.cartList.concat(product);
    const newTotalPrice = state.totalPrice + (product.price || 0);

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cartList: newCartList,
        totalPrice: newTotalPrice,
      },
    });
  }

  function removeFromCart(product: CartProductInfo) {
    const newCartList = state.cartList.filter(
      (cartItem) => cartItem.productId !== product.productId
    );
    const newTotalPrice = state.totalPrice - (product.price || 0);

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cartList: newCartList,
        totalPrice: newTotalPrice,
      },
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
      payload: {
        cartList: [],
        totalPrice: 0,
      },
    });
  }

  const value = {
    cartList: state.cartList,
    totalPrice: state.totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
