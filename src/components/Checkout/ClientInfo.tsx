import Input from "components/Globals/Input";
import PhoneInput from "components/Globals/PhoneInput";
import { Customer, useSiteCtx } from "ctx/siteCtx";
import { FC, useEffect, useState } from "react";
import { debounce } from "debounce";
import styles from "./ClientInfo.module.scss";

const ClientInfo: FC = () => {
  const { updateOrder } = useSiteCtx();

  const [customer, setCustomer] = useState<Customer>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const updateEmail = debounce((email: string) => {
    setCustomer((p) => ({
      ...p,
      email,
    }));
  }, 3000);
  const updatePhone = debounce((phone: string) => {
    setCustomer((p) => ({
      ...p,
      phone,
    }));
  }, 3000);
  const updateFirstName = debounce((firstName: string) => {
    setCustomer((p) => ({
      ...p,
      firstName,
    }));
  }, 3000);
  const updateLastName = debounce((lastName: string) => {
    setCustomer((p) => ({
      ...p,
      lastName,
    }));
  }, 3000);

  useEffect(() => {
    if (
      !!customer.email &&
      !!customer.phone &&
      !!customer.firstName &&
      !!customer.lastName
    ) {
      updateOrder(customer, "customer");
    }
  }, [customer, updateOrder]);

  return (
    <div className={styles.clientInfoWrapper}>
      <h2>Your Details</h2>
      <div className={styles.controls}>
        <div className={styles.full}>
          <Input handler={updateEmail} placeholder="your email" />
        </div>
        <div className={styles.half}>
          <PhoneInput handler={updatePhone} placeholder="mobile phone" />
        </div>
        <div className={styles.half}>
          <p className={styles.description}>
            Your phone number is required for delivery & shipping updates.
          </p>
        </div>
        <div className={styles.half}>
          <Input handler={updateFirstName} placeholder="first name" />
        </div>
        <div className={styles.half}>
          <Input handler={updateLastName} placeholder="last name" />
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
