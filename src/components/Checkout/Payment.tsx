import { FC } from "react";
import styles from "./Payment.module.scss";
import PayPal from "assets/payPal.png";
import Card from "assets/card.png";

const Payment: FC = () => {
  return (
    <div className={styles.payment}>
      <h2>Payment Details</h2>
      <div className={styles.details}>
        <button>
          <img src={PayPal} alt="PayPal" />
        </button>
        <button>
          <img src={Card} alt="Card" />
        </button>
      </div>
    </div>
  );
};

export default Payment;
