import { ProductType } from "@/lib/types";

export type FilterReducerState = {
  productsList: ProductType[];
  priceFilter: string | null;
  difficultyFilter: string | null;
};

export type FilterReducerAction = {
  type: "PRODUCTS_LIST" | "PRICE_SORT" | "DIFFICULTY_FILTER" | "CLEAR";
  payload: {
    productsList: ProductType[];
    priceFilter: string | null;
    difficultyFilter: string | null;
  };
};

export const filterReducer = (
  state: FilterReducerState,
  action: FilterReducerAction
): FilterReducerState => {
  const { type, payload } = action;

  switch (type) {
    case "PRODUCTS_LIST":
      return { ...state, productsList: payload.productsList };
    case "PRICE_SORT":
      return { ...state, priceFilter: payload.priceFilter };
    case "DIFFICULTY_FILTER":
      return { ...state, difficultyFilter: payload.difficultyFilter };
    default:
      return { ...payload };
  }
};
