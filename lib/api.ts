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
import { AddOrderPayload } from "@/app/checkout/page";
import { RemoveFromCartPayload } from "@/components/CartCard";

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
export async function removeProductFromCart({
  userId,
  productId,
  price,
}: RemoveFromCartPayload): Promise<{
  result: string;
}> {
  console.log(userId, productId, price, "ini delete cart di api");
  return await fetch(
    `${SERVER_URL}/cart?userId=${userId}&productId=${productId}&price=${price}`,
    {
      method: "DELETE",
    }
  ).then((res) => {
    console.log(res.json(), "maiwmiaw");
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
  console.log(userId, "ini user id wakt uadd order di api");

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
  return await fetch(`${SERVER_URL}/analytics/${userId}`).then((res) => {
    return res.json();
  });
}

export async function fetchPurchasedProducts(
  userId: string | undefined | null
): Promise<
  {
    name: string;
    image: string;
    category: string;
    link: string;
    isDeleted: boolean;
  }[]
> {
  return await fetch(`${SERVER_URL}/order/${userId}`).then((res) => res.json());
}
