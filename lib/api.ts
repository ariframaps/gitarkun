"use server";

import {
  AnalyticsType,
  CartProductInfo,
  CartType,
  InfinitePageType,
  ProductType,
} from "./types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
}): Promise<InfinitePageType> {
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

export async function fetchSingleProductByName(name: string): Promise<{
  message: string;
  data?: ProductType;
}> {
  return await fetch(`${SERVER_URL}/product/name/${name}`).then((res) =>
    res.json()
  );
}

export async function fetchCart(userId: string | null | undefined): Promise<{
  message: string;
  data?: CartType;
}> {
  return await fetch(`${SERVER_URL}/cart/${userId}`).then((res) => res.json());
}

export async function addCart(
  userId: string | null | undefined,
  product: CartProductInfo
): Promise<{
  message: string;
  data?: CartType;
}> {
  return await fetch(`${SERVER_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, product }),
  }).then((res) => res.json());
}

export async function addProduct(product: ProductType): Promise<{
  message: string;
  data?: ProductType;
}> {
  return await fetch(`${SERVER_URL}/product/my`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

export async function addOrder(userId: string | undefined | null): Promise<{
  message: string;
  data?: ProductType;
}> {
  return await fetch(`${SERVER_URL}/order/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function getMyProduct(userId: string | undefined | null): Promise<{
  message: string;
  data?: ProductType[];
}> {
  return await fetch(`${SERVER_URL}/product/my/${userId}`).then((res) =>
    res.json()
  );
}

export async function fetchAnalytics(
  userId: string | undefined | null
): Promise<{
  message: string;
  data?: AnalyticsType;
}> {
  return await fetch(`${SERVER_URL}/product/my/${userId}`).then((res) =>
    res.json()
  );
}

export async function fetchPurchasedProducts(
  userId: string | undefined | null
): Promise<{
  message: string;
  data?: {
    name: string;
    image: string;
    category: string;
    link: string;
    isDeleted: boolean;
  }[];
}> {
  return await fetch(`${SERVER_URL}/order/${userId}`).then((res) => res.json());
}
