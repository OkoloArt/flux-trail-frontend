import { ImSpinner8 } from 'react-icons/im';
import styles from './index.module.scss';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-12">
      <ImSpinner8 className={styles.spin} size={60} color="#0DAC5C" />
      <div className="font-geist text-[24px] leading-[29px] text-[#101928] font-[500] text-center">
        We’re processing your payment. Don’t close this modal
      </div>
    </div>
  );
};
