import React from "react";

const PurchasedProductCard = ({
  product,
}: {
  product: {
    name: string;
    image: string;
    category: string;
    link: string;
    isDeleted: boolean;
  };
}) => {
  return (
    <div>
      <p>{product.name}</p>
      <p>{product.category}</p>
      <p>{product.link}</p>
      <p>{product.isDeleted}</p>
    </div>
  );
};

export default PurchasedProductCard;
