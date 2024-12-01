"use client";

import { createContext, useContext, useReducer } from "react";
import { filterReducer, FilterReducerState } from "../reducer/filterReducer";
import { ProductType } from "@/lib/types";

type FilterContextType = {
  state: FilterReducerState;
  productsList: ProductType[];
  initialProductsList: (products: ProductType[]) => void;
  priceDispatch: (value: string) => void;
  difficultyDispatch: (value: string) => void;
  clearDispatch: () => void;
};

const defaultState: FilterReducerState = {
  productsList: [],
  priceFilter: null,
  difficultyFilter: null,
};

const defaultValue: FilterContextType = {
  state: defaultState,
  productsList: [],
  initialProductsList: () => {},
  priceDispatch: () => {},
  difficultyDispatch: () => {},
  clearDispatch: () => {},
};

export const filterContext = createContext<FilterContextType>(defaultValue);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, defaultState);

  const initialProductsList = (products: ProductType[]) => {
    dispatch({
      type: "PRODUCTS_LIST",
      payload: {
        productsList: products,
        difficultyFilter: null,
        priceFilter: null,
      },
    });
  };

  const difficultyDispatch = (value: string) => {
    dispatch({
      type: "DIFFICULTY_FILTER",
      payload: {
        difficultyFilter: value,
        productsList: state.productsList,
        priceFilter: state.priceFilter,
      },
    });
  };

  const priceDispatch = (value: string) => {
    dispatch({
      type: "PRICE_SORT",
      payload: {
        priceFilter: value,
        productsList: state.productsList,
        difficultyFilter: state.difficultyFilter,
      },
    });
  };

  const clearDispatch = () => {
    dispatch({
      type: "CLEAR",
      payload: {
        productsList: state.productsList,
        priceFilter: null,
        difficultyFilter: null,
      },
    });
  };

  function difficulty(products: ProductType[]) {
    switch (state.difficultyFilter) {
      case "Beginner":
        return products.filter((product) => product.difficulty === "Beginner");
      case "Intermediate":
        return products.filter(
          (product) => product.difficulty === "Intermediate"
        );
      case "Advanced":
        return products.filter((product) => product.difficulty === "Advanced");
      default:
        return products;
    }
  }

  function price(products: ProductType[]) {
    switch (state.priceFilter) {
      case "lowToHigh":
        return products.sort((a, b) => a.price - b.price);
      case "highToLow":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }

  const filteredProductsList = price(difficulty(state.productsList));

  const value = {
    state,
    productsList: filteredProductsList,
    initialProductsList,
    difficultyDispatch,
    priceDispatch,
    clearDispatch,
  };

  return (
    <filterContext.Provider value={value}>{children}</filterContext.Provider>
  );
};

export const useFilter = () => useContext(filterContext);
