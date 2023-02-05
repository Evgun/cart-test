import { CartItem, useSiteCtx } from "ctx/siteCtx";
import { FC } from "react";
import styles from "./ProductItem.module.scss";

type ProductItemProps = {
  item: CartItem;
};

const ProductItem: FC<ProductItemProps> = ({ item }) => {
  return (
    <div className={styles.productItemWrapper}>
      <div className={styles.image}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.info}>
        <div className={styles.header}>{item.name}</div>
        <div className={styles.controls}>
          <CountEdit count={item.count} index={item.id} />
          <div className={styles.price}>
            {(
              (item.price.discountPrice || item.price.totalPrice) * item.count
            ).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

type CountEditProps = {
  count: number;
  index: number;
};

const CountEdit: FC<CountEditProps> = ({ count, index }) => {
  const { updateItemCount } = useSiteCtx();

  return (
    <div className={styles.countEdit}>
      <button onClick={() => updateItemCount(index, "remove")}>-</button>
      <div className={styles.count}>
        <p>{count}</p>
      </div>
      <button onClick={() => updateItemCount(index, "add")}>+</button>
    </div>
  );
};
