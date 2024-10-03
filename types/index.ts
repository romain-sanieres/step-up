export type RegisterFormType = {
  email: string;
  password: string;
};

export type CompanyFormType = {
  name: string;
  stripe: string;
  description: string;
};

export type ProductType = {
  id?: string;
  name: string;
  description: string;
  price: string;
  collection?: string;
  tags?: string;
  size?: string[];
  gender?: string;
  limit?: number;
  sku: string;
  images: string[];
};

export type StockType = {
  id: string;
  inventory: number;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  size: string[];
};
