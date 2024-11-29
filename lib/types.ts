export type ProductCardType = {
  id: string;
  name: string;
  image: string;
  price: number;
  sellerId: string;
};

export type ProductType = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  link: string;
  sellerId: string;
  isDeleted: false;
};

export type NavLinkType = {
  name: string;
  href: string;
};
