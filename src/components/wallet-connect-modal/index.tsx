'use client';

import { useWallet } from '@txnlab/use-wallet';
import { BackgroundOverlay } from '../background-overlay';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { GrClose } from 'react-icons/gr';

interface Props {
  onClose: () => void;
}

export const WalletConnectModal = ({ onClose }: Props) => {
  const { providers: wallets, activeAddress } = useWallet();

  useEffect(() => {
    if (activeAddress) {
      onClose();
    }
  }, [activeAddress]);

  return (
    <BackgroundOverlay onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h4>Connect a Wallet</h4>
          <GrClose onClick={onClose} />
        </div>
        <div className="flex flex-col px-6 gap-4">
          <h5 className="font-geist text-[14px] font-[400] text-[#645D5D]">
            Select your preferred method
          </h5>
          <div className={styles.wallets}>
            {wallets?.map((wallet) => (
              <div className={styles.wallet} key={wallet.metadata.id} onClick={wallet.connect}>
                <img src={wallet.metadata.icon} alt={`${wallet.metadata.name} icon`} />
                <span>{wallet.metadata.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BackgroundOverlay>
  );
};
