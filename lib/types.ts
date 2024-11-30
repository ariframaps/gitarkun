export type ProductCardType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  sellerId: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  isDeleted: boolean;
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
  __v: string;
};

export type ProductResponseType = {
  message: string;
  data?: ProductType[];
  totalItems?: number;
};

export type ProductSoldCardType = ProductCardType & {
  userId: string;
};

export type InfinitePageType = {
  data: ProductResponseType;
  currentPage: number;
  nextPage: number | null;
};

export type NavLinkType = {
  name: string;
  href: string;
};
