import { FC, useState } from "react";
import styles from "./Promo.module.scss";
import cn from "classnames";
import { useSiteCtx } from "ctx/siteCtx";
import { Cross } from "components/Svg";

const Promo: FC = () => {
  const { addPromoCode, promoCodes, removePromoCode } = useSiteCtx();

  const [open, setOpen] = useState(promoCodes.length > 0);
  const [input, setInput] = useState("");

  return (
    <div className={cn(styles.promoWrapper, { [styles.active]: open })}>
      <div className={styles.promoInput}>
        <div className={styles.controls}>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Coupon Code"
          />
          <button
            onClick={() => {
              if (input) {
                addPromoCode(input);
                setInput("");
              }
            }}
          >
            <span>APPLY</span>
          </button>
        </div>
        <div className={styles.list}>
          {promoCodes.map((item, id) => {
            return (
              <div key={id} className={styles.promoCode}>
                <p>{item}</p>
                <button onClick={() => removePromoCode(item)}>
                  <Cross />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.enter}>
        <p>Promo Code?</p>
        <button onClick={() => setOpen(true)}>Enter Code</button>
      </div>
    </div>
  );
};

export default Promo;
