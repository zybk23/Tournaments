import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import styles from "../styles/modalDialog.module.scss";

const DeleteModal = ({
  show,
  onClose,
  children,
  title,
  handleClickSuccess,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseDialog = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.modalOverlay}>
      <div className={styles.deleteModalDialogContainer}>
        {/* <p className={styles.deleteModalDialogTitle}>{title}</p> */}
        <p className={styles.deleteModalDialogContent}>{children}</p>
        <div className={styles.deleteModalDialogButtonContainer}>
          <div
            className={styles.deleteModalDialogButton}
            data-testid="clickRemoveBtn"
            onClick={handleClickSuccess}
            style={{ backgroundColor: "#90D959" }}
          >
            Yes
          </div>
          <div
            className={styles.deleteModalDialogButton}
            onClick={handleCloseDialog}
            style={{ backgroundColor: "#D65959" }}
          >
            No
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default React.memo(DeleteModal);
