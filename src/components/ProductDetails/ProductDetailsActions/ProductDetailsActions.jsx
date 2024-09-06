"use client";

import { useRouter } from "next/navigation";
import useAlertModal from "../../../hook/useAlertModal";
import { getCartList, addToCart } from "../../../api/Cart";
import { userToken, isLogin } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import AlertModal from "../../Modal/AlertModal.jsx/AlertModal";
import styles from "./ProductDetailsActions.module.css";
import { useEffect } from "react";

export default function ProductDetailsActions({ productId }) {
  console.log(productId);
  const { modalState, showModal, closeModal } = useAlertModal();
  const router = useRouter();

  const token = useRecoilValue(userToken);
  const isLoginState = useRecoilValue(isLogin);
  console.log(isLoginState);

  const getShoppingCartList = async () => {
    const res = await getCartList(token);
    console.log(res);
  };

  useEffect(() => {
    getShoppingCartList();
  }, [getShoppingCartList]);

  const isInCart = () => {};

  const addToShoppingCart = async () => {
    const body = {
      product_id: `${parseInt(productId)}`,
      quantity: `${count}`,
    };

    const res = await addToCart(body, token);
    console.log(res);
  };

  return (
    <>
      <div className={styles.totalProductPriceWrapper}>
        <p>Total Price</p>
        <div className={styles.totalProductPriceInner}>
          {/* <p>
            총 수량 <strong>{count}</strong> 개
          </p> */}
          <p>
            총 수량 <strong></strong> 개
          </p>
          {/* <p className={styles.totalProductPriceCal}><strong>{(price * count).toLocaleString()}</strong> 원</p> */}
          <p className={styles.totalProductPriceCal}>
            <strong></strong> 원
          </p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        {isLoginState ? (
          <button
            className={styles.primaryActionButton}
            onClick={() => {
              addToCart();
              router.push(`/order`);
            }}
          >
            BuyNow
          </button>
        ) : (
          <button
            className={styles.primaryActionButton}
            onClick={() =>
              showModal({
                submitText: "예",
                cancelText: "아니오",
                onCancel: closeModal,
                onSubmit: () => router.push(`/accountsetup/loginout`),
                content: "로그인이 필요한 서비스입니다. 로그인 하시겠습니까? ",
              })
            }
          >
            BuyNow
          </button>
        )}
        <button
          className={styles.actionBtn}
          onClick={() =>
            showModal({
              submitText: "예",
              cancelText: "아니오",
              onCancel: closeModal,
              onSubmit: () => router.push(`/cart`),
              content: "장바구니에 담긴 상품입니다. 장바구니로 이동하시겠습니까?",
            })
          }
        >
          AddToCart
        </button>
      </div>
      <AlertModal modalState={modalState} />
    </>
  );
}
