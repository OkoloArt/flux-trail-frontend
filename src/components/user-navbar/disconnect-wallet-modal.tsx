'use client';

import { useWallet } from '@txnlab/use-wallet';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PromptModal } from '../prompt-modal';
import { useRouter } from 'next/navigation';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const DisconnectWalletModal = ({ visible, onClose }: Props) => {
  const { providers } = useWallet();
  const [prompt, setPrompt] = useState(false);
  const { push } = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const disconnectWallet = () => {
    setPrompt(false);

    if (!providers) return;

    for (const provider of providers) {
      provider.disconnect();
    }

    localStorage.clear();
    push('/');
    onClose();
  };

  const listenForClick = (event: UIEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
      document.removeEventListener('click', listenForClick);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', listenForClick);
    } else {
      document.removeEventListener('click', listenForClick);
    }
  }, [visible]);

  return (
    <>
      <div
        style={{ boxShadow: 'box-shadow: 0px 12px 16px -4px #10182814' }}
        className={classNames(
          'flex-col w-[180px] bg-white py-1 absolute top-[120%] right-0',
          visible ? 'flex' : 'hidden',
        )}
        ref={ref}
      >
        <Link
          href="/ticket-history"
          className={classNames(
            'px-[14px] py-2 cursor-pointer text-sm font-geist',
            'font-[500] text-[#001620]',
          )}
        >
          View tickets
        </Link>
        <div
          className={classNames(
            'px-[14px] py-2 cursor-pointer text-sm font-geist',
            'font-[500] text-[#D42620]',
          )}
          onClick={() => setPrompt(true)}
        >
          Disconnect wallet
        </div>
      </div>

      <PromptModal
        visible={prompt}
        onClose={() => setPrompt(false)}
        title="Disconnect wallet"
        description="Are you sure you want to disconnect your wallet? You will no longer be able to interact with your account or make any transactions until you reconnect your wallet"
        yesButtonText="Disconnect"
        yesAction={disconnectWallet}
        noButtonText="Cancel"
        noAction={() => setPrompt(false)}
      />
    </>
  );
};
