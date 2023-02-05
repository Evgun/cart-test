import { FC, useState } from "react";
import styles from "./PhoneInput.module.scss";
import Select from "./Select";
import codes from "country-calling-code";
import "flag-icons-svg/css/flag-icons.css";

const callingCodes = codes.map((item) => ({
  display: (
    <div className={styles.flagContainer}>
      <span className={`flag-icon flag-icon-${item.isoCode2.toLowerCase()}`} />
      <p>+{item.countryCodes[0]}</p>
    </div>
  ),
  value: item.countryCodes[0],
}));

type PhoneInputProps = {
  handler: (e: string) => void;
  placeholder: string;
};

const PhoneInput: FC<PhoneInputProps> = ({ handler, placeholder }) => {
  const [countryCode, setCountryCode] = useState(callingCodes[0].value);

  return (
    <div className={styles.phoneInputWrapper}>
      <div className={styles.controlsContainer}>
        <div className={styles.selectContainer}>
          <Select
            options={callingCodes}
            value={countryCode}
            onClick={(code) => {
              setCountryCode(code);
            }}
          />
        </div>

        <input
          type="text"
          onChange={(e) => {
            if (e.target.value.length === 10) {
              handler(countryCode + "" + e.target.value);
            }
          }}
        />
      </div>

      <p className={styles.placeholder}>{placeholder}</p>
    </div>
  );
};

export default PhoneInput;
