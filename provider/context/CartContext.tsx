"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer } from "../reducer/CartReducer";
import { CartProductInfo, CartType } from "@/types/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/utils/api";

type CartContextType = {
  cart: CartType;
  totalPrice: number;
  addToCart: (product: CartProductInfo) => void;
  removeFromCart: (product: CartProductInfo) => void;
  clearCart: () => void;
};

const defaultValue: CartContextType = {
  cart: {
    total: 0,
    userId: "",
    products: [],
  },
  totalPrice: 0 as number,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultValue);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, defaultValue);
  const { userId } = useAuth();

  // initial load from api and save it di cache
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(userId),
    refetchOnMount: true,
    enabled: !!userId,
  });

  // update cart list and total price when data is fetched
  useEffect(() => {
    if (cartData?.products && !isLoading && !error) {
      const initialCartList = cartData;
      const initialTotalPrice = cartData.total;

      dispatch({
        type: "SET_CART",
        payload: {
          cart: initialCartList,
          totalPrice: initialTotalPrice,
        },
      });
    }
  }, [cartData, isLoading, error]);

  async function addToCart(product: CartProductInfo) {
    const newCartList = state.cart.products.concat(product);
    const newTotalPrice = state.totalPrice + (product.price || 0);

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cart: { ...state.cart, products: newCartList },
        totalPrice: newTotalPrice,
      },
    });
  }

  function removeFromCart(product: CartProductInfo) {
    const newCartList = state.cart.products.filter(
      (cartItem) => cartItem.product !== product.product
    );
    const newTotalPrice = state.totalPrice - (product.price || 0);

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        cart: { ...state.cart, products: newCartList },
        totalPrice: newTotalPrice,
      },
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
      payload: {
        cart: {
          total: 0,
          userId: "",
          products: [],
        },
        totalPrice: 0,
      },
    });
  }

  const value = {
    cart: state.cart,
    totalPrice: state.totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
