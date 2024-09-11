"use client";
import styles from "./OrderForm.module.css";

export default function OrderForm() {
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.subTitle}>배송정보</h2>
        <h3 className={styles.sectionTitle}>주문자 정보</h3>
        <div className={styles.infoWrapper}>
          <div className={styles.infoDetailsWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              이름
            </label>
            <input className={styles.styledInput} type="text" />
          </div>
          <div className={styles.phoneInfoWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              휴대폰
            </label>
            <div className={styles.phoneNumberInputWrapper}>
              <input className={styles.FrontNumberInput} type="text" />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" />
            </div>
          </div>
          <div className={styles.infoDetailsWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              이메일
            </label>
            <input className={styles.styledInput} type="text" />
          </div>
        </div>
        <h4 className={styles.sectionTitle}>배송지 정보</h4>
        <form>
          <div className={styles.infoDetailsWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              이름
            </label>
            <input className={styles.styledInput} type="text" />
          </div>
          <div className={styles.phoneInfoWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              휴대폰
            </label>
            <div className={styles.phoneNumberInputWrapper}>
              <input className={styles.FrontNumberInput} type="text" />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" />
              <span> - </span>
              <input className={styles.phoneNumberInput} type="text" />
            </div>
          </div>
          <div className={styles.phoneInfoWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              배송 주소
            </label>
            <div className={styles.deliveryInfoWrapper}>
              <div>
                <input className={styles.deliveryAddressInput} type="text" />
                <button className={styles.actionBtn}>우편번호 조회</button>
              </div>
              <input className={styles.styledInput} type="text" />
              <input className={styles.styledInput} type="text" />
            </div>
          </div>
          <div className={styles.infoDetailsWrapper}>
            <label className={styles.styledLabel} htmlFor="">
              배송메세지
            </label>
            <input className={styles.styledInput} type="text" />
          </div>

          <div className={styles.paymentInfoWrapper}>
            <div className={styles.paymentMethodWrapper}>
              <div className={styles.sectionTitle}>결제 수단</div>
              <div className={styles.payOption}>
                <input className={styles.checkedInput} type="radio" />
                <p>신용 / 체크카드</p>
                <input className={styles.checkedInput} type="radio" />
                <p>무통장 입금</p>
                <input className={styles.checkedInput} type="radio" />
                <p>휴대폰 결제</p>
                <input className={styles.checkedInput} type="radio" />
                <p>네이버페이</p>
                <input className={styles.checkedInput} type="radio" />
                <p>카카오페이</p>
              </div>
            </div>

            <div className={styles.paymentDetailsWrapper}>
              <div className={styles.sectionTitle}>최종 결제 정보</div>
              <div className={styles.paymentDetails}>
                <p>
                  - 상품 금액
                  <span>원</span>
                </p>
                <p>
                  - 할인 금액
                  <span>0 원</span>
                </p>
                <div className={styles.shippingFeeWrapper}>
                  <p>
                    - 배송비
                    <span> 원</span>
                  </p>
                </div>
                <p>
                  - 결제
                  <span> 원</span>
                </p>
                <div className={styles.agreementWrapper}>
                  <input className={styles.checkedInput} type="checkbox" />
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
