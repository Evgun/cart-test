import { Logo, SHA, Verified } from "components/Svg";
import { FC } from "react";
import Checkout from "./Checkout";
import styles from "./CheckoutMain.module.scss";
import ClientInfo from "./ClientInfo";
import DeliveryMain from "./DeliveryMain";
import Payment from "./Payment";

const CheckoutMain: FC = () => {
  return (
    <div className={styles.checkoutWrapper}>
      <header>
        <Logo />
        <h1>Checkout</h1>
      </header>
      <div className={styles.mainContent}>
        <div className={styles.leftCol}>
          <ClientInfo />
          <DeliveryMain />
          <Payment />
        </div>
        <div className={styles.rightCol}>
          <Checkout />
        </div>
      </div>
      <footer>
        <p>Secured & Encrypted Checkout</p>
        <div className={styles.logos}>
          <Verified />
          <SHA />
        </div>
      </footer>
    </div>
  );
};

export default CheckoutMain;
