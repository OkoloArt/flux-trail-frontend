import { ConnectWalletSection } from './connect-wallet-section';
import { DescriptionSection } from './description-section';
import styles from './index.module.scss';

export const AdminLogin = () => {
  return (
    <div className={styles.container}>
      <div className="w-[100%] max-w-[1440px] p-[20px] flex flex-row items-center">
        <DescriptionSection />
        <ConnectWalletSection />
      </div>
    </div>
  );
};
