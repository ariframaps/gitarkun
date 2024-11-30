"use server";

import { ProductType } from "./types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type ProductResponseType = {
  message: string;
  data?: ProductType[];
  totalItems?: number;
};

export async function fetchLatestProducts(): Promise<{
  message: string;
  data: ProductType[];
}> {
  return await fetch(`${SERVER_URL}/product/latest`).then((res) => res.json());
}

export async function fetchAllProducts({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: ProductResponseType;
  currentPage: number;
  nextPage: number | null;
}> {
  const FETCH_LIMIT = 9;
  const response = await fetch(`${SERVER_URL}/product`);
  const data = await response.json();

  return {
    data: data,
    currentPage: pageParam,
    nextPage:
      pageParam + FETCH_LIMIT < data.totalItems
        ? pageParam + FETCH_LIMIT
        : null,
  };
}
