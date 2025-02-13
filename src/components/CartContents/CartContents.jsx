"use client";

import { useEffect, useState } from "react";
import { orderType, userToken } from "../../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { deleteAllCartItem, deleteCartItem, modifyCartCount } from "../../api/Cart";
import { totalProductPrice, totalShippingPrice } from "../../lib/utils/calculate";
import Image from "next/image";
import useGetCartProducts from "../../hook/useGetCartProducts";
import useProductInfos from "../../hook/useProductInfos";
import AlertModal from "../Modal/AlertModal/AlertModal";
import CountControl from "../CountControl/CountControl";
import useAlertModal from "../../hook/useAlertModal";
import deleteIcon from "../../../public/img/icon-delete.png";
import styles from "./CartContents.module.css";

export default function CartContents() {
  const [count, setCount] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isActive, setIsActive] = useState("");

  const token = useRecoilValue(userToken);

  const { cartList, getShoppingCartList, productIds } = useGetCartProducts(token);
  const { productInfos } = useProductInfos(token, productIds);
  const { modalState, showModal, closeModal } = useAlertModal();

  const setOrderType = useSetRecoilState(orderType);

  const sumProductPrice = totalProductPrice(productInfos, cartList);
  const sumShippingPrice = totalShippingPrice(productInfos);

  const router = useRouter();

  useEffect(() => {
    const cartListQuantity = cartList.map((list) => list.quantity);
    setCount(cartListQuantity);
  }, [cartList]);

  const handleCountChange = (index, newCount) => {
    setCount((prevCount) => {
      const updateCount = [...prevCount];
      updateCount[index] = newCount;
      modifyCount(index, newCount);
      return updateCount;
    });
  };

  // 수량 수정하기
  const modifyCount = async (index, newCount) => {
    const body = {
      product_id: `${cartList[index].product_id}`,
      quantity: `${newCount}`,
    };
    await modifyCartCount(cartList[index].cart_item_id, body, token);
    getShoppingCartList();
  };

  // 개별 구매하기
  const cartOneOrder = async (index) => {
    const body = {
      product_id: `${cartList[index].product_id}`,
      quantity: `${cartList[index].quantity}`,
      is_active: true,
    };
    await modifyCartCount(cartList[index].cart_item_id, body, token);
    router.push(`/order`);
    setOrderType("cart_one_order");
  };

  // 전체 구매하기
  const cartAllOrder = async () => {
    const promises = cartList.map((list) => {
      const body = {
        product_id: `${list.product_id}`,
        quantity: `${list.quantity}`,
        is_active: true,
      };
      return modifyCartCount(list.cart_item_id, body, token);
    });

    await Promise.all(promises);
    router.push(`/order`);
    setOrderType("cart_order");
  };

  const handleCheckBox = async (index) => {
    setSelected((prevSelected) => {
      if (!prevSelected.includes(index)) {
        return [...prevSelected, index];
      } else {
        console.log(selected);
        return prevSelected.filter((i) => i !== index);
      }
    });
  };

  // 개별 삭제
  const deleteCartList = async () => {
    console.log(selected);

    if (selected.length === 0) {
      return getShoppingCartList();
    } else {
      const cartItemId = selected.map((index) => cartList[index].cart_item_id);
      await deleteCartItem(cartItemId, token);
      setSelected([]);
      getShoppingCartList();
    }
  };

  // 전체 삭제
  const deleteAllCartList = async () => {
    await deleteAllCartItem(token);
    getShoppingCartList();
  };

  return (
    <>
      {productInfos.length === 0 ? (
        <>
          <div className={styles.contentsWrapper}>
            <div className={styles.contents}>Empty</div>
            <button onClick={() => router.push(`/`)}>Go Shopping</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.wrapper}>
            {productInfos.map((product, index) => (
              <div className={styles.cartListWrapper} key={index}>
                <input className={styles.checkBox} type="checkbox" checked={selected.includes(index)} onChange={() => handleCheckBox(index)} />
                <div className={styles.productInfoWrapper}>
                  <p className={styles.productStoreName}>{product.store_name}</p>
                  <p>{product.product_name}</p>
                  <p className={styles.productPrice}>{product.price.toLocaleString()} 원</p>
                  <p className={styles.shippingMethod}>{product.shipping_method === "PARCEL" ? "택배배송" : "무료배송"}</p>
                </div>
                <div className={styles.countControlWrapper}>
                  <CountControl key={index} stock={product.stock} count={count[index]} onCountChange={(newCount) => handleCountChange(index, newCount)} />
                </div>
                <div className={styles.TotalPriceWrapper}>
                  <p className={styles.TotalPrice}>{(product.price * count[index]).toLocaleString()} 원</p>
                  <button className={styles.oneOrderBtn} onClick={() => cartOneOrder(index)}>
                    Order
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() =>
                      showModal({
                        submitText: "예",
                        cancelText: "아니오",
                        onCancel: closeModal,
                        onSubmit: () => {
                          closeModal();
                          deleteCartList();
                        },
                        content: "상품을 삭제하시겠습니까?",
                      })
                    }
                  >
                    <Image src={deleteIcon} alt="deleteIcon" priority={true} />
                  </button>
                </div>
              </div>
            ))}
            <button
              className={styles.emptyBtn}
              onClick={() =>
                showModal({
                  submitText: "예",
                  cancelText: "아니오",
                  onCancel: closeModal,
                  onSubmit: () => {
                    deleteAllCartList();
                    closeModal();
                  },
                  content: "장바구니를 비우시겠습니까?",
                })
              }
            >
              Empty
            </button>
            <AlertModal modalState={modalState} />
            <div className={styles.totalPriceCal}>
              <span>Sub Total</span>
              <p>{sumProductPrice.toLocaleString()} 원</p>
              <span>Shipping</span>
              <p>{sumShippingPrice.toLocaleString()} 원</p>
              <span>Total</span>
              <p>{(sumProductPrice + sumShippingPrice).toLocaleString()} 원 </p>
            </div>
            <div className={styles.actionBtnWrapper}>
              <button
                className={isActive === "allOrderBtn" ? styles.active : ""}
                onClick={() => {
                  cartAllOrder();
                  setIsActive("allOrderBtn");
                }}
              >
                All Order
              </button>
              <button
                className={isActive === "navigationBtn" ? styles.active : ""}
                onClick={() => {
                  setIsActive("navigationBtn");
                  router.push(`/`);
                }}
              >
                Go To Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
