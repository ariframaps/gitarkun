"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer } from "../reducer/CartReducer";
import { CartProductInfo } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/lib/api";

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
  const { isSignedIn, userId } = useAuth();

  console.log(userId, "miawmiawmiaw");

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
    if (cartData && !isLoading && !error) {
      console.log(cartData, "ini di context");
      const initialCartList = cartData.products || [];
      const initialTotalPrice = cartData.total;

      dispatch({
        type: "SET_CART",
        payload: {
          cartList: initialCartList,
          totalPrice: initialTotalPrice,
        },
      });
    }
  }, [cartData, isLoading, error]);

  async function addToCart(product: CartProductInfo) {
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

  async function removeFromCart(product: CartProductInfo) {
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

    await fetch(
      `${process.env.SERVER_URL}/cart?userId=${useAuth().userId}&productId=${
        product.productId
      }&price=${product.price}`,
      {
        method: "DELETE",
      }
    );
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
