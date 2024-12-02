"use server";

import { UpdateProductPayload } from "@/components/MyProductCard";
import {
  AnalyticsType,
  CartProductInfo,
  CartType,
  InfinitePageType,
  ProductType,
} from "./types";
import { AddCartPayload } from "@/app/products/[name]/page";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function fetchLatestProducts(): Promise<ProductType[]> {
  return await fetch(`${SERVER_URL}/product/latest`).then((res) => res.json());
}

// export async function fetchAllProducts({
//   pageParam,
// }: {
//   pageParam: number;
// }): Promise<InfinitePageType> {
//   const FETCH_LIMIT = 9;
//   const response = await fetch(`${SERVER_URL}/product`);
//   let data = await response.json();

//   return {
//     data: data,
//     currentPage: pageParam,
//     nextPage:
//       pageParam + FETCH_LIMIT < data.totalItems
//         ? pageParam + FETCH_LIMIT
//         : null,
//   };
// }

export async function fetchAllProducts(): Promise<ProductType[]> {
  return await fetch(`${SERVER_URL}/product`).then((res) => res.json());
}

export async function fetchSingleProductByName(
  name: string
): Promise<ProductType> {
  return await fetch(`${SERVER_URL}/product/name/${name}`).then((res) =>
    res.json()
  );
}
export async function deleteProduct({
  productId,
}: UpdateProductPayload): Promise<{
  result: ProductType;
}> {
  return await fetch(`${SERVER_URL}/product/my/${productId}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export async function fetchCart(
  userId: string | null | undefined
): Promise<CartType> {
  console.error(userId, "userIDDDDIDDID");
  return await fetch(`${SERVER_URL}/cart/${userId}`).then((res) => res.json());
}

export async function addCart({ userId, cartItem }: AddCartPayload): Promise<{
  result: CartType;
}> {
  console.log(cartItem, "ini diapi");
  return await fetch(`${SERVER_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, product: cartItem }),
  }).then((res) => {
    console.log(res.json());
    return res.json();
  });
}

export async function addProduct(product: ProductType): Promise<{
  result: ProductType;
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
  result: ProductType;
}> {
  return await fetch(`${SERVER_URL}/order/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function getMyProduct(userId: string | undefined | null): Promise<{
  products: ProductType[];
}> {
  return await fetch(`${SERVER_URL}/product/my/${userId}`).then((res) =>
    res.json()
  );
}

export async function fetchAnalytics(
  userId: string | undefined | null
): Promise<{
  analysis: AnalyticsType;
}> {
  return await fetch(`${SERVER_URL}/product/my/${userId}`).then((res) =>
    res.json()
  );
}

export async function fetchPurchasedProducts(
  userId: string | undefined | null
): Promise<{
  purchasedProducts:
    | {
        name: string;
        image: string;
        category: string;
        link: string;
        isDeleted: boolean;
      }[];
}> {
  return await fetch(`${SERVER_URL}/order/${userId}`).then((res) => res.json());
}
