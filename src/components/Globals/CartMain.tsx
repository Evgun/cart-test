import { FC, useState } from "react";
import { Cart, Cross } from "../Svg";
import styles from "./CartMain.module.scss";
import Modal from "./Modal";
import cn from "classnames";
import Advertisement from "./Product/Advertisement";
import Promo from "./Product/Promo";
import CheckoutInfo from "./Product/CheckoutInfo";
import ArrowButton from "./ArrowButton";
import ProductMain from "./Product/ProductMain";
import { useSiteCtx } from "ctx/siteCtx";
import { useNavigate } from "react-router-dom";

const CartMain: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        className={styles.cart}
      >
        <Cart />
      </button>
      <CartModal openModal={openModal} closeModal={closeModal} />
    </>
  );
};

export default CartMain;

type CartModalProps = {
  openModal: boolean;
  closeModal: () => void;
};

const CartModal: FC<CartModalProps> = ({ openModal, closeModal }) => {
  const { cart } = useSiteCtx();
  const navigate = useNavigate();

  return (
    <Modal state={[openModal, closeModal]} className={styles.cartModal}>
      <div
        className={cn(styles.modalContainer, { [styles.active]: openModal })}
      >
        <div className={styles.modalHeader}>
          <button
            onClick={() => {
              closeModal();
            }}
            className={styles.cross}
          >
            <Cross />
          </button>
          <p>Your Cart</p>
        </div>
        {cart.length > 0 ? (
          <>
            <div className={styles.mainContent}>
              <ProductMain />
              <Promo />
              <Advertisement />
            </div>
            <div className={styles.checkout}>
              <CheckoutInfo />
              <div className={styles.splitter} />
              <ArrowButton
                theme="black"
                text="Checkout now"
                handler={() => {
                  navigate("checkout");
                }}
              />
            </div>
          </>
        ) : (
          <p className={styles.nothing}>
            There’s nothing for your poor cat in your cart!
          </p>
        )}
      </div>
    </Modal>
  );
};
