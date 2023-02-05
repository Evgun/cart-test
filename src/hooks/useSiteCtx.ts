import { CartItem, Order, Price, SiteCtxProps } from "ctx/siteCtx";
import { useCallback, useEffect, useMemo, useState } from "react";
import Catnip from "assets/cat-street-hero-olive_2000.webp";
import Creme from "assets/cat-street-creme_2000.webp";
import Cover from "assets/cat-street-olive_2000.webp";

const promocodeList: {
  [key: string]: number;
} = {
  life: 5,
  he4der: 10,
};

export const useSiteCtxValues = (): SiteCtxProps => {
  const [price, setPrice] = useState<Price>({
    subtotal: 0,
    shipping: undefined,
    discount: 0,
    total: 0,
  });
  const [promoCodes, setPromoCodes] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>(initialCartValue);
  const [order, setOrder] = useState<Order>({
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
        name: "",
        price: undefined,
      },
    },
    items: [],
    price: null,
  });

  const addPromoCode = (i: string) => {
    setPromoCodes((p) => {
      if (p.length === 0) return [i];

      if (p.length > 0 && p.indexOf(i) === -1) {
        return [...p, i];
      }

      return [...p];
    });
  };
  const removePromoCode = (i: string) => {
    setPromoCodes((p) => p.filter((item) => item !== i));
  };

  const updateItemCount = (id: number, dir: "add" | "remove") => {
    setCart((p) => {
      let updatedItems = p.map((item) => {
        if (id === item.id) {
          if (dir === "add") return { ...item, count: item.count + 1 };

          if (dir === "remove") return { ...item, count: item.count - 1 };
        }

        return item;
      });

      return updatedItems.filter((item) => item.count > 0);
    });
  };

  const addNewProduct = (product: CartItem) => {
    setCart((p) => {
      return [
        ...p.reduce((acc: CartItem[], cur) => {
          return [
            ...acc,
            {
              ...cur,
              count: product.id === cur.id ? cur.count + 1 : cur.count,
            },
          ];
        }, []),
        ...(p.some((i) => product.id === i.id) ? [] : [product]),
      ];
    });
  };

  const updateOrder = useCallback(
    (info: { [key: string]: any }, type: "delivery" | "customer") => {
      setOrder((p) => ({
        ...p,
        [type]: {
          ...info,
        },
      }));
    },
    []
  );

  const isOrderReady = useMemo(() => {
    if (
      order.items.length > 0 &&
      !!order.customer.email &&
      !!order.customer.firstName &&
      !!order.customer.lastName &&
      !!order.customer.phone &&
      !!order.delivery.address &&
      !!order.delivery.country &&
      !!order.delivery.type.name
    ) {
      return true;
    }

    return false;
  }, [order]);

  useEffect(() => {
    setPrice((p) => {
      const subtotal = cart.reduce((acc, cur) => {
        return (
          acc + (cur.price.discountPrice || cur.price.totalPrice) * cur.count
        );
      }, 0);

      const shipping = order.delivery.type.price;

      const discount = promoCodes.reduce((acc, cur) => {
        return acc + (promocodeList[cur.toLowerCase()] || 0);
      }, 0);

      const result = {
        ...p,
        subtotal,
        shipping: shipping,
        discount: subtotal * (discount / 100),
        total: subtotal + (shipping || 0) - (subtotal * (discount / 100) || 0),
      };

      setOrder((p) => ({
        ...p,
        price: result,
        items: cart,
      }));

      return result;
    });
  }, [cart, promoCodes, order.delivery.type.price]);

  return {
    ...initialValue,
    promoCodes,
    addPromoCode,
    removePromoCode,
    price,
    cart,
    updateItemCount,
    addNewProduct,
    order,
    updateOrder,
    isOrderReady,
  };
};

export default useSiteCtxValues;

const initialValue = {
  advertisementItem: {
    id: 0,
    name: "Catnip",
    price: {
      totalPrice: 129,
      discountPrice: 122.55,
    },
    image: Catnip,
    count: 1,
  },
};

const initialCartValue = [
  {
    id: 1,
    name: "Bouclé Bungalow “Creme” Cover",
    price: {
      totalPrice: 239,
      discountPrice: null,
    },
    image: Creme,
    count: 1,
  },
  {
    id: 2,
    name: "Replacement Cover in “Catnip”",
    price: {
      totalPrice: 129,
      discountPrice: null,
    },
    image: Cover,
    count: 1,
  },
];
