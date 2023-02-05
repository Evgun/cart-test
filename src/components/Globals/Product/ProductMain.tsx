import { useSiteCtx } from "ctx/siteCtx";
import { FC } from "react";
import ProductItem from "./ProductItem";
import styles from "./ProductMain.module.scss";

const ProductMain: FC = () => {
  const { cart } = useSiteCtx();

  return (
    <div className={styles.product}>
      {cart.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ProductMain;
