export type ProductType = {
  _id?: string;
  name: string;
  image: string;
  description: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  link: string;
  sellerId: string | undefined | null;
  isDeleted: boolean;
  isCreatedAt?: string;
  isUpdatedAt?: string;
  __v?: string;
};

export type ProductResponseType = {
  message: string;
  data?: ProductType[];
  totalItems?: number;
};

export type AnalyticsType = {
  sellerId: string;
  totalSales: number;
  totalRevenue: number;
  productStats: {
    product: ProductType;
    salesCount: number;
    revenue: number;
  }[];
};

export type CartType = {
  _id: string;
  userId: string;
  products: CartProductInfo[];
  total: number;
  cratedAt: Date;
  __v: string;
};

export type CartProductInfo = {
  productId: string | undefined;
  name: string | undefined;
  image: string | undefined;
  price: number | undefined;
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
