import { ProductType } from "@/lib/types";
import React from "react";

const ProductSoldCard = ({
  product,
}: {
  product: { product: ProductType; salesCount: number; revenue: number };
}) => {
  return (
    <li>
      <p>name: {product.product.name}</p>
      <p>price: {product.product.price}</p>
      <p>salesCount: {product.salesCount}</p>
      <p>revenue: {product.revenue}</p>
    </li>
  );
};

export default ProductSoldCard;
