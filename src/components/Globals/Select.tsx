import cn from "classnames";
import { FC, ReactNode, useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { SelectArrow } from "components/Svg";
import styles from "./Select.module.scss";

type SelectProps = {
  options: { display: string | ReactNode; value: string }[];
  value: string;
  onClick: (arg: string) => void;
  placeholder?: string;
};

const Select: FC<SelectProps> = ({ options, value, onClick, placeholder }) => {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectRef, () => setIsOpenSelect(false));

  return (
    <div className={styles.select} ref={selectRef}>
      <div
        className={cn(styles.mainContainer, {
          [styles.containerOpened]: isOpenSelect,
        })}
        onClick={() => setIsOpenSelect((previous) => !previous)}
      >
        <div className={cn(styles.value, { [styles.active]: !!value })}>
          {options.find((item) => item.value === value)?.display || ""}
        </div>
        {!!placeholder && (
          <p className={cn(styles.placeholder, { [styles.inactive]: !!value })}>
            {placeholder}
          </p>
        )}
        <SelectArrow />
      </div>
      {isOpenSelect && (
        <div className={styles.optionsContainer}>
          <div className={styles.optionsScroll}>
            {options.map((item, id) => (
              <div
                className={cn(styles.option, {
                  [styles.choosedOption]: item.value === value,
                })}
                key={id}
                onClick={() => {
                  onClick(item.value);
                  setIsOpenSelect(false);
                }}
              >
                {item.display}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
