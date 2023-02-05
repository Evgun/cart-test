import { useSiteCtx } from "ctx/siteCtx";
import { FC } from "react";
import ArrowButton from "../ArrowButton";
import styles from "./Advertisement.module.scss";

const Advertisement: FC = () => {
  const { advertisementItem, addNewProduct } = useSiteCtx();

  if (!advertisementItem) return null;

  return (
    <div className={styles.advertisementWrapper}>
      <p className={styles.header}>Only For Cool Cats...</p>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src={advertisementItem.image} alt={advertisementItem.name} />
        </div>
        <div className={styles.info}>
          <div className={styles.description}>
            Add the “{advertisementItem.name}” cover to your order and save 5%
          </div>
          <div className={styles.price}>
            {advertisementItem.price.discountPrice ? (
              <>
                <p>${advertisementItem.price.discountPrice}</p>
                <p className={styles.fullPrice}>
                  ${advertisementItem.price.totalPrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p>${advertisementItem.price.totalPrice.toFixed(2)}</p>
            )}
          </div>
          <ArrowButton
            text="Add now"
            handler={() => {
              addNewProduct(advertisementItem);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
