"use client";

import { useForm } from "react-hook-form";

import styles from "./OrderForm.module.css";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { orderType, userToken } from "../../../recoil/atoms";
import { order } from "../../../api/Order";
import { totalProductPrice, totalShippingPrice } from "../../../lib/utils/calculate";
import ZipCodeSearchModal from "../../Modal/ZipCodeSearchModal/ZipCodeSearchModal";
import useGetCartProducts from "../../../hook/useGetCartProducts";
import useProductInfos from "../../../hook/useProductInfos";

export default function OrderForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSameOrderInfo, setIsSameOrderInfo] = useState(false);

  const token = useRecoilValue(userToken);
  const orderState = useRecoilValue(orderType);

  console.log(orderState);

  const { cartList, productIds, cartListCount } = useGetCartProducts(token);
  const { productInfos } = useProductInfos(token, productIds);

  console.log(productIds);
  console.log(cartListCount);

  const sumProductPrice = totalProductPrice(productInfos, cartList);
  const sumShippingPrice = totalShippingPrice(productInfos);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const name = watch("name");
  const frontNumber = watch("frontNumber");
  const secondNumber = watch("secondNumber");
  const lastNumber = watch("lastNumber");

  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", {
        type: "emailPattern",
        message: "이메일 주소에 '@' 기호를 포함시켜 주세요.",
      });
    } else {
      clearErrors("email");
    }
  }, [email, setError, clearErrors]);

  const getZipCode = (data) => {
    setIsVisible(false);
    setValue("postCode", data.zonecode);
    setValue("address", data.address);
  };

  const handleOSameOrderInfo = () => {
    setIsSameOrderInfo(true);
    setValue("orderName", name);
    setValue("orderFirstNumber", frontNumber);
    setValue("orderSecondNumber", secondNumber);
    setValue("orderLastNumber", lastNumber);
  };

  const onSubmitPayment = async (data) => {
    console.log(data);
    const { orderName, frontNumber, secondNumber, lastNumber, postCode, address, additionalAddress, addressMessage } = getValues();
    const phoneNumber = [...frontNumber, secondNumber, lastNumber].join("");
    const deliveryAddress = [...postCode, address, additionalAddress].join("");
    console.log(phoneNumber);
    const body = {
      payment_method: `${selectedOption}`,
      order_kind: `${orderState}`,
      product_id: `${productIds}`,
      quantity: `${cartListCount}`,
      receiver: `${orderName}`,
      receiver_phone_number: `${phoneNumber}`,
      address: `${deliveryAddress}`,
      address_message: `${addressMessage}`,
      total_price: `${sumProductPrice + sumShippingPrice}`,
    };

    const res = await order(body, token);
    console.log(res);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.subTitle}>배송정보</h2>
        <h3 className={styles.sectionTitle}>주문자 정보</h3>
        <div>
          <div className={styles.infoDetailsWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              이름
            </label>
            <input className={styles.styledInput} type="text" {...register("name")} />
          </div>
          <div className={styles.phoneInfoWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              휴대폰
            </label>
            <div className={styles.phoneNumberInputWrapper}>
              <input className={styles.FrontNumberInput} type="text" maxLength={3} {...register("frontNumber")} />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" maxLength={4} {...register("secondNumber")} />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" maxLength={4} {...register("lastNumber")} />
            </div>
          </div>
          <div className={styles.infoDetailsWrapper}>
            <div className={styles.emailInputWrapper}>
              <label className={styles.styledLabel} htmlFor="">
                이메일
              </label>
              <input className={styles.styledInput} {...register("email")} type="text" />
              {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            </div>
          </div>
        </div>
        <div className={styles.deliveryInfoHeaderWrapper}>
          <h4>배송지 정보</h4>
          <div className={styles.deliveryInfoHeaderDetails}>
            <input type="radio" onClick={() => handleOSameOrderInfo()} checked={isSameOrderInfo === true} readOnly />
            <p>주문자 정보와 동일</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmitPayment)}>
          <div className={styles.infoDetailsWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              이름
            </label>
            <input className={styles.styledInput} type="text" {...register("orderName")} />
          </div>
          <div className={styles.phoneInfoWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              휴대폰
            </label>
            <div className={styles.phoneNumberInputWrapper}>
              <input className={styles.FrontNumberInput} type="text" maxLength={3} {...register("orderFirstNumber")} />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" maxLength={4} {...register("orderSecondNumber")} />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" maxLength={4} {...register("orderLastNumber")} />
            </div>
          </div>
          <div className={styles.phoneInfoWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              배송 주소
            </label>
            <div className={styles.deliveryInfoWrapper}>
              <div>
                <input className={styles.deliveryAddressInput} type="text" {...register("postCode")} readOnly />
                <button type="button" className={styles.actionBtn} onClick={() => setIsVisible(true)}>
                  우편번호 조회
                </button>
              </div>
              {isVisible && <ZipCodeSearchModal onComplete={getZipCode} />}
              <input className={styles.styledInput} type="text" {...register("address")} />
              <input className={styles.styledInput} type="text" {...register("additionalAddress")} />
            </div>
          </div>
          <div className={styles.infoDetailsWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              배송메세지
            </label>
            <input className={styles.styledInput} type="text" {...register("addressMessage")} />
          </div>

          <div className={styles.paymentInfoWrapper}>
            <div className={styles.paymentMethodWrapper}>
              <div className={styles.sectionTitle}>결제 수단</div>
              <div className={styles.payOption}>
                <input className={styles.checkedInput} type="radio" onClick={() => setSelectedOption("신용체크카드")} checked={selectedOption === "신용체크카드"} readOnly />
                <p>신용 / 체크카드</p>
                <input className={styles.checkedInput} type="radio" onClick={() => setSelectedOption("무통장입금")} checked={selectedOption === "무통장입금"} readOnly />
                <p>무통장 입금</p>
                <input className={styles.checkedInput} type="radio" onClick={() => setSelectedOption("휴대폰결제")} checked={selectedOption === "휴대폰결제"} readOnly />
                <p>휴대폰 결제</p>
                <input className={styles.checkedInput} type="radio" onClick={() => setSelectedOption("네이버페이")} checked={selectedOption === "네이버페이"} readOnly />
                <p>네이버페이</p>
                <input className={styles.checkedInput} type="radio" onClick={() => setSelectedOption("카카오페이")} checked={selectedOption === "카카오페이"} readOnly />
                <p>카카오페이</p>
              </div>
            </div>

            <div className={styles.paymentDetailsWrapper}>
              <div className={styles.sectionTitle}>최종 결제 정보</div>
              <div className={styles.paymentDetails}>
                <p>
                  - 상품 금액
                  <span>{sumProductPrice.toLocaleString()}원</span>
                </p>
                <p>
                  - 할인 금액
                  <span>0 원</span>
                </p>
                <div className={styles.shippingFeeWrapper}>
                  <p>
                    - 배송비
                    <span>{sumShippingPrice.toLocaleString()} 원</span>
                  </p>
                </div>
                <p>
                  - 결제
                  <span className={styles.totalPrice}>{(sumProductPrice + sumShippingPrice).toLocaleString()} 원</span>
                </p>
                <div className={styles.agreementWrapper}>
                  <input className={styles.checkedInput} type="checkbox" required />
                  <span>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</span>
                </div>
                <button className={styles.submitBtn} type="submit">
                  PAYMENT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
