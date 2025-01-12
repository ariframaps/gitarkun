"use server";

import { UpdateProductPayload } from "@/components/MyProductCard";
import {
  AnalyticsType,
  CartProductInfo,
  CartType,
  ProductType,
} from "../types/types";
import { AddCartPayload } from "../types/types";
import { AddOrderPayload } from "../types/types";
import { RemoveFromCartPayload } from "../types/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function fetchLatestProducts(): Promise<ProductType[]> {
  return await fetch(`${SERVER_URL}/product/latest`).then((res) => res.json());
}

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
  return await fetch(`${SERVER_URL}/cart/${userId}`).then((res) => res.json());
}

export async function addCart({ userId, cartItem }: AddCartPayload): Promise<{
  result: CartType;
}> {
  return await fetch(`${SERVER_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, product: cartItem }),
  }).then((res) => {
    return res.json();
  });
}
export async function removeProductFromCart({
  userId,
  productId,
  price,
}: RemoveFromCartPayload): Promise<{
  result: string;
}> {
  return await fetch(
    `${SERVER_URL}/cart?userId=${userId}&productId=${productId}&price=${price}`,
    {
      method: "DELETE",
    }
  ).then((res) => {
    return res.json();
  });
}

export async function addProduct({
  product,
}: {
  product: ProductType;
}): Promise<ProductType> {
  return await fetch(`${SERVER_URL}/product/my`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

export async function addOrder({
  userId,
}: AddOrderPayload): Promise<{ result: ProductType }> {
  return await fetch(`${SERVER_URL}/order/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function getMyProduct(
  userId: string | undefined | null
): Promise<{ products: ProductType[] }> {
  return await fetch(`${SERVER_URL}/product/my/${userId}`).then((res) =>
    res.json()
  );
}

export async function fetchAnalytics(
  userId: string | undefined | null
): Promise<AnalyticsType> {
  return await fetch(`${SERVER_URL}/analytics/${userId}`).then((res) =>
    res.json()
  );
}

export async function fetchPurchasedProducts(
  userId: string | undefined | null
): Promise<ProductType[]> {
  return await fetch(`${SERVER_URL}/order/${userId}`).then((res) => {
    if (!res.ok) throw new Error("error fetching order");
    return res.json();
  });
}

export async function getTransactionToken({
  gross_amount,
  customer_details,
  cart,
}: {
  gross_amount: number;
  customer_details: { first_name: string; email: string; phone: string };
  cart: CartProductInfo[];
}): Promise<{ transactionToken: string }> {
  const cart_items = cart.map((item) => ({
    id: item.product,
    name: item.name,
    price: item.price,
    quantity: 1,
  }));

  return await fetch(`${SERVER_URL}/get-transaction-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gross_amount,
      customer_details,
      cart_items,
    }),
  }).then((res) => res.json());
}
