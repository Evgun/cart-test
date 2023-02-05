import ArrowButton from "components/Globals/ArrowButton";
import Advertisement from "components/Globals/Product/Advertisement";
import CheckoutInfo from "components/Globals/Product/CheckoutInfo";
import ProductMain from "components/Globals/Product/ProductMain";
import Promo from "components/Globals/Product/Promo";
import { useSiteCtx } from "ctx/siteCtx";
import { FC } from "react";
import styles from "./Checkout.module.scss";

const Checkout: FC = () => {
  const { order, isOrderReady } = useSiteCtx();

  console.log(order);

  return (
    <div className={styles.checkout}>
      <h2>Your order</h2>
      <div className={styles.cartItems}>
        <ProductMain />
        <Promo />
        <CheckoutInfo />
      </div>
      <ArrowButton
        theme="black"
        text="Pay now"
        disabled={!isOrderReady}
        handler={() => {
          alert(
            `CUSTOMER:\n\nFirst name: ${order.customer.firstName}\nLast name: ${order.customer.lastName}\nEmail: ${order.customer.email}\nPhone: ${order.customer.phone}\n\nDELIVERY DETAILS:\n\nCountry: ${order.delivery.country}\nAddress: ${order.delivery.address}\n\nTOTAL PRICE: $${order.price?.total}`
          );
        }}
      />
      <div className={styles.splitter} />
      <Advertisement />
    </div>
  );
};

export default Checkout;
