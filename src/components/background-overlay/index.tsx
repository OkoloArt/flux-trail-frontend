import { ReactNode } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

interface BackgroundOverlayProps {
  children?: ReactNode;
  visible?: boolean;
  onClose?: () => any;
  className?: string;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
}

export const BackgroundOverlay = ({
  children = <></>,
  visible = true,
  onClose = () => null,
  className,
  overlayClassName,
  overlayStyle,
}: BackgroundOverlayProps) => {
  return visible ? (
    <div className={classNames(styles['wrapper'], className)}>
      <div
        style={overlayStyle}
        className={classNames(styles['overlay'], overlayClassName)}
        onClick={onClose}
      ></div>
      {children}
    </div>
  ) : null;
};
