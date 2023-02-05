import cn from "classnames";
import { FC, useState } from "react";
import styles from "./Input.module.scss";

type InputProps = {
  handler: (e: string) => void;
  placeholder: string;
  wrapText?: boolean;
};

const Input: FC<InputProps> = ({ handler, placeholder, wrapText = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      {wrapText ? (
        <div
          className={styles.textarea}
          contentEditable
          onInput={(e) => {
            if (
              "innerText" in e.target &&
              typeof e.target.innerText === "string"
            ) {
              handler(e.target.innerText);

              if (e.target.innerText.length > 0) {
                setHasContent(true);
              } else {
                setHasContent(false);
              }
            }
          }}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      ) : (
        <input
          type="text"
          onChange={(e) => {
            handler(e.target.value);

            if (e.target.value.length > 0) {
              setHasContent(true);
            } else {
              setHasContent(false);
            }
          }}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      )}

      <p
        className={cn(styles.placeholder, {
          [styles.inactive]: isActive || hasContent,
        })}
      >
        {placeholder}
      </p>
    </div>
  );
};

export default Input;
