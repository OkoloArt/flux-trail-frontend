'use client';

import Link from 'next/link';
import styles from './index.module.scss';
import { FluxTrailLogo } from '@/assets/flux-trail-logo.icon';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Button } from '../buttons';
import { useWallet } from '@txnlab/use-wallet';
import { useSetRecoilState } from 'recoil';
import { ConnectWalletVisibleAtom } from '@/state';
import { NigeriaFlag } from '@/assets/nigeria-flag.icon';
import { useState } from 'react';
import { DisconnectWalletModal } from './disconnect-wallet-modal';
import { generateProfileImage } from '@/utils/generate-profile-image';

export const UserNavbar = () => {
  const pathname = usePathname();
  const { activeAddress } = useWallet();
  const [disconnectModal, setDisconnectModal] = useState(false);
  const setWalletConnect = useSetRecoilState(ConnectWalletVisibleAtom);

  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo_and_routes}>
          <Link href="/" className={styles.logo}>
            <FluxTrailLogo />
            <div className={styles.logo_text}>FluxTrail</div>
          </Link>
          <div className={classNames('flex flex-row items-center gap-[17px]', styles.routes)}>
            <Link href="/" className={pathname === '/' ? styles.active : ''}>
              Home
            </Link>
            <Link
              href="/ticket-history"
              className={pathname === '/ticket-history' ? styles.active : ''}
            >
              Tickets
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-6 items-center">
          <div className="flex flex-row p-[10px] gap-[5px] rounded bg-white">
            <div className="font-satoshi font-semibold text-sm text-[#344054]">NG</div>
            <NigeriaFlag />
          </div>
          {!activeAddress ? (
            <Button onClick={() => setWalletConnect(true)} className="w-[188px]">
              Connect Wallet
            </Button>
          ) : (
            <div
              className={classNames(
                'relative flex flex-row gap-3 items-center pt-4 pb-4 pr-6 pl-6 bg-white',
                'rounded-lg border-[1px] border-[#E4E7EC] cursor-pointer min-w-[192px]',
              )}
              onClick={() => setDisconnectModal(true)}
            >
              <img
                src={generateProfileImage(activeAddress)}
                alt="Profile image"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-geist font-semibold text-base text-[#475367]">
                {activeAddress.slice(0, 6)}...{activeAddress.slice(activeAddress.length - 4)}
              </span>

              <DisconnectWalletModal
                visible={disconnectModal}
                onClose={() => setDisconnectModal(false)}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
