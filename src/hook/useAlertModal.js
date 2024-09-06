import { useState } from "react";

export default function useAlertModal() {
  const [modalState, setModalState] = useState({
    isVisible: false,
    submitText: "예",
    cancelText: "아니오",
    onCancel: () => closeModal(),
    onSubmit: () => {},
    content: "",
  });

  const showModal = (config) => {
    setModalState({
      isVisible: true,
      ...config,
    });
  };

  const closeModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  return { modalState, showModal, closeModal };
}
