"use client";

import { useRouter } from "next/navigation";
import useAlertModal from "../../../hook/useAlertModal";
import AlertModal from "../../Modal/AlertModal.jsx/AlertModal";
import styles from "./ProductDetailButtonActions.module.css";

export default function ProductDetailButtonActions() {
  const { modalState, showModal, closeModal } = useAlertModal();
  const router = useRouter();

  return (
    <>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.primaryActionButton}
          onClick={() =>
            showModal({
              text: "예",
              otherText: "아니오",
              onCancel: closeModal,
              onSubmit: () => router.push(`/accountsetup/loginout`),
              content: "로그인이 필요한 서비스입니다. 로그인 하시겠습니까? ",
            })
          }
        >
          BuyNow
        </button>
        <button
          className={styles.actionBtn}
          onClick={() =>
            showModal({
              text: "아니오",
              otherText: "예",
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
