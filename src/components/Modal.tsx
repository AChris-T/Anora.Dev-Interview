import React, { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(isOpen);
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setAnimClass(styles.modalOpen);
    } else if (show) {
      setAnimClass(styles.modalClose);
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, show, styles.modalOpen, styles.modalClose]);

  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${animClass}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
