import { ButtonArrow } from "components/Svg";
import { FC } from "react";
import styles from "./ArrowButton.module.scss";
import cn from "classnames";

type ArrowButtonProps = {
  text: string;
  handler: () => void;
  theme?: "default" | "black";
  disabled?: boolean;
};

const ArrowButton: FC<ArrowButtonProps> = ({
  text,
  handler,
  theme = "default",
  disabled = false,
}) => {
  return (
    <button
      onClick={handler}
      className={cn(styles.buttonContainer, styles[theme], {
        [styles.disabled]: disabled,
      })}
    >
      <ButtonArrow />
      <p>{text}</p>
    </button>
  );
};

export default ArrowButton;
