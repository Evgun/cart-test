import { createContext, useContext } from "react";

export const SiteCtx = createContext<SiteCtxProps>({
  advertisementItem: null,
  promoCodes: [],
  addPromoCode: () => {},
  removePromoCode: () => {},
  price: {
    subtotal: 0,
    shipping: undefined,
    discount: 0,
    total: 0,
  },
  cart: [],
  updateItemCount: () => {},
  addNewProduct: () => {},
  order: {
    customer: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
    },
    delivery: {
      country: "",
      address: "",
      type: {
        name: "Free",
        price: 0,
      },
    },
    items: [],
    price: null,
  },
  updateOrder: () => {},
  isOrderReady: false,
});

export const useSiteCtx = (): SiteCtxProps => {
  return useContext(SiteCtx);
};

export interface SiteCtxProps {
  advertisementItem: CartItem | null;
  promoCodes: string[] | [];
  addPromoCode: (i: string) => void;
  removePromoCode: (i: string) => void;
  price: Price;
  cart: CartItem[];
  updateItemCount: (id: number, dir: "add" | "remove") => void;
  addNewProduct: (i: CartItem) => void;
  order: Order;
  updateOrder: (
    info: { [key: string]: any },
    type: "delivery" | "customer"
  ) => void;
  isOrderReady: boolean;
}

export type Price = {
  subtotal: number;
  shipping?: number;
  discount: number;
  total: number;
};

export type Customer = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};

export type Delivery = {
  country: string;
  address: string;
  type: {
    name: string;
    price: number | undefined;
  };
};

export type CartItem = {
  id: number;
  name: string;
  price: {
    totalPrice: number;
    discountPrice: number | null;
  };
  image: string;
  count: number;
};

export type Order = {
  customer: Customer;
  delivery: Delivery;
  items: CartItem[];
  price: Price | null;
};
