import Modal from "components/Globals/Modal";
import { Delivery, useSiteCtx } from "ctx/siteCtx";
import { FC, useEffect, useState } from "react";
import styles from "./DeliveryMain.module.scss";
import { Cross } from "components/Svg";
import Select from "components/Globals/Select";
import codes from "country-calling-code";
import { debounce } from "debounce";
import Input from "components/Globals/Input";

const shipping = [
  {
    name: "Free",
    price: 0,
  },
  {
    name: "Standart",
    price: 10,
  },
  {
    name: "Express",
    price: 25.3,
  },
];

const countries = codes.map((item) => ({
  display: item.country,
  value: item.country,
}));

const DeliveryMain: FC = () => {
  const { updateOrder } = useSiteCtx();

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const [delivery, setDelivery] = useState<Delivery>({
    country: "",
    address: "",
    type: {
      name: "Free",
      price: 0,
    },
  });

  const updateCountry = (country: string) => {
    setDelivery((p) => ({
      ...p,
      country,
    }));
  };

  const updateAddress = debounce((address: string) => {
    setDelivery((p) => ({
      ...p,
      address,
    }));
  }, 3000);

  const updateType = (type: { name: string; price: number }) => {
    setDelivery((p) => ({
      ...p,
      type,
    }));
  };

  useEffect(() => {
    if ((!!delivery.country && !!delivery.address) || !!delivery.type.name) {
      updateOrder(delivery, "delivery");
    }
  }, [delivery, updateOrder]);

  return (
    <div className={styles.delivery}>
      <h2>Delivery Details</h2>
      <div className={styles.controls}>
        <div className={styles.country}>
          <Select
            options={countries}
            value={delivery.country}
            onClick={(country) => {
              updateCountry(country || "");
            }}
            placeholder="country"
          />
        </div>
        <div className={styles.address}>
          <Input
            handler={updateAddress}
            placeholder="delivery address"
            wrapText={true}
          />
        </div>
        <div className={styles.shipping}>
          {shipping.map((item, id) => {
            return (
              <label key={id}>
                <input
                  type="radio"
                  name="shipping"
                  onChange={() => {
                    updateType(item);
                  }}
                  checked={item.name === delivery.type.name}
                />
                <span>{item.name} Shipping</span>
                <span>${item.price.toFixed(2)}</span>
              </label>
            );
          })}
          <button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            about shipping
          </button>
        </div>
      </div>
      <ShippingInfo openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default DeliveryMain;

type ShippingInfoProps = {
  openModal: boolean;
  closeModal: () => void;
};

const ShippingInfo: FC<ShippingInfoProps> = ({ openModal, closeModal }) => {
  return (
    <Modal state={[openModal, closeModal]} className={styles.shippingModal}>
      <div className={styles.modalContainer}>
        <button
          onClick={() => {
            closeModal();
          }}
          className={styles.cross}
        >
          <Cross />
        </button>
        <div className={styles.info}>
          Some info about shipping. I have no idea what to add here. So I add
          some Coupon codes. You can try "life" and "he4der" for different
          discounts
        </div>
      </div>
    </Modal>
  );
};
