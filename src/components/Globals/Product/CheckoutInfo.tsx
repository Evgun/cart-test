import { useSiteCtx } from "ctx/siteCtx";
import { FC } from "react";
import styles from "./CheckoutInfo.module.scss";

const CheckoutInfo: FC = () => {
  const { price } = useSiteCtx();

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.subtotal}>
        <p className={styles.name}>Subtotal</p>
        <p className={styles.price}>${price.subtotal.toFixed(2)}</p>
      </div>
      <div className={styles.shipping}>
        <p className={styles.name}>Shipping</p>
        <p className={styles.price}>
          {typeof price.shipping === "number"
            ? `$${price.shipping.toFixed(2)}`
            : "calculated next step"}
        </p>
      </div>
      <div className={styles.discounts}>
        <p className={styles.name}>Discounts</p>
        <p className={styles.price}>
          {price.discount > 0 ? `-$${price.discount.toFixed(2)}` : "$0.00"}
        </p>
      </div>
      <div className={styles.total}>
        <p className={styles.name}>TOTAL</p>
        <p className={styles.price}>
          <span>AUD</span>${price.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CheckoutInfo;
