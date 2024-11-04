'use client';

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { BackgroundOverlay } from '../background-overlay';
import { GrClose } from 'react-icons/gr';

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalWidth?: number;
}

export const SideModal = ({ children, isOpen, onClose, modalWidth = 640 }: Props) => {
  const [slideOpen, setSlideOpen] = useState(false);

  const close = () => {
    setSlideOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      setSlideOpen(true);
    }
  }, [isOpen]);

  return (
    <BackgroundOverlay visible={isOpen} onClose={close}>
      <div
        className={styles.modal}
        style={{
          transform: slideOpen ? 'translateX(0)' : `translateX(${modalWidth}px)`,
          width: `${modalWidth}px`,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.close} onClick={close}>
          <GrClose />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </BackgroundOverlay>
  );
};
