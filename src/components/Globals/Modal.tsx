import cn from "classnames";
import {
  Dispatch,
  FC,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type ModalState = [boolean, Dispatch<SetStateAction<boolean>>];

const Modal: FC<{
  state: ModalState;
  className?: string;
  children?: ReactNode;
}> = (props) => {
  const { children, state, className = "" } = props;
  const [open, setOpen] = state;
  const [portal, setPortal] = useState<ReactPortal | null>(null);

  useEffect(() => {
    const rootEl = document.querySelector("#root");
    if (rootEl) {
      const ModalReactNode = (
        <div className={cn(styles.modal, className, { [styles.active]: open })}>
          <div className={styles.close} onClick={() => setOpen(false)} />
          {children}
        </div>
      );
      setPortal(createPortal(ModalReactNode, rootEl));
    }
  }, [children, setOpen, className, open]);

  return portal;
};

export default Modal;
