"use client";

import { userToken } from "../../recoil/atoms";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useGetCartProducts from "../../hook/useGetCartProducts";
import useProductInfos from "../../hook/useProductInfos";
import { deleteAllCartItem, deleteCartItem, modifyCartCount } from "../../api/Cart";
import AlertModal from "../Modal/AlertModal/AlertModal";
import CountControl from "../CountControl/CountControl";
import useAlertModal from "../../hook/useAlertModal";
import deleteIcon from "../../../public/img/icon-delete.png";
import styles from "./CartContents.module.css";

export default function CartContents() {
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState([]);

  const token = useRecoilValue(userToken);

  const { cartList, getShoppingCartList } = useGetCartProducts(token);

  console.log(cartList);
  const productsInTheCart = useMemo(() => cartList.map((v) => v.product_id), [cartList]);
  const { productInfos } = useProductInfos(token, productsInTheCart);
  const { modalState, showModal, closeModal } = useAlertModal();

  const sumProductPrice = productInfos.map((product) => product.price).reduce((acc, cur) => acc + cur, 0);
  const sumShippingPrice = productInfos.map((product) => product.shipping_fee).reduce((acc, cur) => acc + cur, 0);

  const router = useRouter();

  // 수량 수정하기
  const modifyCount = async (index, newCount) => {
    console.log(token);
    console.log(index);
    console.log(newCount);
    const body = {
      product_id: `${cartList[index].product_id}`,
      quantity: `${newCount}`,
    };
    const res = await modifyCartCount(cartList[index].cart_item_id, body, token);
    console.log(res);
  };

  // 개별 구매하기
  const cartOneOrder = async (index) => {
    const body = {
      product_id: `${cartList[index].product_id}`,
      quantity: `${cartList[index].quantity}`,
      is_active: true,
    };
    const res = await modifyCartCount(cartList[index].cart_item_id, body, token);
    console.log(res);
    router.push(`/order`);
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

    const res = await Promise.all(promises);
    console.log(res);
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
    const cartItemId = selected.map((index) => cartList[index].cart_item_id);
    if (cartItemId) {
      const res = await deleteCartItem(cartItemId, token);
      if (res) {
        setSelected([]);
        getShoppingCartList();
      }
    }
  };

  // 전체 삭제
  const deleteAllCartList = async () => {
    console.log(token);
    const res = await deleteAllCartItem(token);
    console.log(res);
    getShoppingCartList();
  };

  return (
    <div className={styles.wrapper}>
      {productInfos.map((product, index) => (
        <div className={styles.cartListWrapper} key={index}>
          <input className={styles.checkBox} type="checkbox" checked={selected.includes(index)} onChange={() => handleCheckBox(index)} />
          <div className={styles.productInfoWrapper}>
            <p className={styles.productStoreName}>{product.store_name}</p>
            <p>{product.product_name}</p>
            <p>{product.price}</p>
            <p>{product.shipping_method === "PARCEL" ? "택배배송" : "무료배송"}</p>
          </div>
          <div className={styles.countControlWrapper}>
            <CountControl stock={product.stock} count={count} setCount={setCount} onCountChange={(newCount) => modifyCount(index, newCount)} />
          </div>
          <div className={styles.TotalProductPriceWrapper}>
            <p className={styles.TotalProductPrice}>{(product.price * count).toLocaleString()} 원</p>
            <button className={styles.actionBtn} onClick={() => cartOneOrder(index)}>
              Order
            </button>
            <button
              className={styles.deleteBtn}
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
      <div>
        <button
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
      </div>
      <AlertModal modalState={modalState} />
      <div className={styles.totalPriceCal}>
        <span>Sub Total</span>
        <p>{sumProductPrice}</p>
        <span>Shipping</span>
        <p>{sumShippingPrice}</p>
        <span>Total</span>
        <p>{sumProductPrice + sumShippingPrice}</p>
      </div>
      <div>
        <button onClick={() => cartAllOrder()}>All Order</button>
        <button>Go To Shopping</button>
      </div>
    </div>
  );
}
