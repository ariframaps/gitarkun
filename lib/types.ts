export type ProductCardType = {
  id: string;
  name: string;
  image: string;
  price: number;
  sellerId: string;
};

export type ProductType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  link: string;
  sellerId: string;
  isDeleted: false;
  isCreatedAt: string;
  isUpdatedAt: string;
};

export type ProductSoldCardType = ProductCardType & {
  userId: string;
};

export type NavLinkType = {
  name: string;
  href: string;
};
