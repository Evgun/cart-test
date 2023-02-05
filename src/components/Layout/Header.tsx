import { FC } from "react";
import CartMain from "../Globals/CartMain";
import { Logo } from "../Svg";
import styles from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <CartMain />
    </header>
  );
};

export default Header;
