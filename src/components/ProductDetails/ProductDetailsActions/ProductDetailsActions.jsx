"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "../../../api/Cart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userToken, isLogin, cartItemCount, orderType } from "../../../recoil/atoms";
import useGetCartProducts from "../../../hook/useGetCartProducts";
import useAlertModal from "../../../hook/useAlertModal";
import CountControl from "../../CountControl/CountControl";
import AlertModal from "../../Modal/AlertModal/AlertModal";
import styles from "./ProductDetailsActions.module.css";

export default function ProductDetailsActions({ productId, price, stock }) {
  const { modalState, showModal, closeModal } = useAlertModal();
  const [count, setCount] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const router = useRouter();

  const token = useRecoilValue(userToken);
  const setOrderType = useSetRecoilState(orderType);

  const isLoginState = useRecoilValue(isLogin);

  const { cartList, productIds } = useGetCartProducts(token);

  const addToCartItemCount = useRecoilValue(cartItemCount);

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  useEffect(() => {
    if (cartList) {
      const isInCart = productIds.includes(parseInt(productId));
      setIsInCart(isInCart);
    }
  }, [cartList]);

  const directOrder = async () => {
    const body = {
      product_id: `${parseInt(productId)}`,
      quantity: `${addToCartItemCount}`,
    };

    const res = await addToCart(body, token);
    console.log(res);
    router.push(`/order`);
    setOrderType("direct_order");
  };

  const addToShoppingCart = async () => {
    console.log(count);
    const body = {
      product_id: `${parseInt(productId)}`,
      quantity: `${addToCartItemCount}`,
    };

    const res = await addToCart(body, token);
    console.log(res);
    router.push(`/cart`);
  };

  return (
    <>
      <CountControl stock={stock} count={count} setCount={setCount} onCountChange={(newCount) => handleCountChange(newCount)} />
      <div className={styles.totalProductPriceWrapper}>
        <p>Total Price</p>
        <div className={styles.totalProductPriceInner}>
          <p>
            총 수량 <strong>{count}</strong> 개
          </p>
          <p className={styles.totalProductPriceCal}>
            <strong>{(price * count).toLocaleString()}</strong> 원
          </p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        {isLoginState ? (
          <button
            className={styles.primaryActionButton}
            onClick={() => {
              directOrder();
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
        {isInCart ? (
          <button
            className={styles.actionBtn}
            onClick={() =>
              showModal({
                submitText: "예",
                cancelText: "아니오",
                onCancel: closeModal,
                onSubmit: () => addToShoppingCart(),
                content: "장바구니에 담긴 상품입니다. 장바구니로 이동하시겠습니까?",
              })
            }
          >
            AddToCart
          </button>
        ) : (
          <button className={styles.actionBtn} onClick={() => addToShoppingCart()}>
            Add To Cart
          </button>
        )}
      </div>
      <AlertModal modalState={modalState} />
    </>
  );
}
