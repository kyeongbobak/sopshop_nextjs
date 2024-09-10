import styles from "./AlertModal.module.css";

export default function AlertModal({ modalState }) {
  if (!modalState.isVisible) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentsWrapper}>
        <p className={styles.contents}>{modalState.content}</p>
        <div className={styles.buttonWrapper}>
          <button className={styles.actionBtn} onClick={modalState.onSubmit}>
            {modalState.submitText}
          </button>
          <button className={styles.actionBtn} onClick={modalState.onCancel}>
            {modalState.cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
