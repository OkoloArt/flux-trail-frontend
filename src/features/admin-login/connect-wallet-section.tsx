'use client';

import { useAdminAuthActions } from '@/actions/admin-auth';
import { Button } from '@/components/buttons';
import { Provider, useWallet } from '@txnlab/use-wallet';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ConnectWalletSection = () => {
  const { providers: wallets, activeAddress } = useWallet();
  const { push } = useRouter();
  const { signAuthTransaction, login } = useAdminAuthActions();
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);

  const disconnectWallet = () => {
    for (const wallet of wallets || []) {
      wallet.disconnect();
    }

    localStorage.clear();
  };

  const onSignAuthTransaction = async () => {
    if (loading) return;

    setLoading(true);
    const authTxnBase64 = await signAuthTransaction();

    if (!authTxnBase64) {
      disconnectWallet();
    } else {
      const token = await login(authTxnBase64);

      if (!token) {
        disconnectWallet();
      } else {
        push('/admin/routes');
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (activeAddress) {
      onSignAuthTransaction();
    }
  }, [activeAddress]);

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="flex flex-col max-w-[454px] gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-geist font-[600] text-[#1B1818] text-[36px] leading-[43.2px]">
              Connect Wallet
            </div>
            <div className="font-geist font-[400] text-[#645D5D] text-sm">
              Connect your registered wallet to gain access to FluxTrail Admin
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {wallets?.map((wallet) => (
              <div
                style={{ boxShadow: '0px 1.5px 4px -1px #10192812' }}
                className={classNames(
                  'group flex flex-row items-center gap-3 py-3 px-6',
                  'rounded-xl cursor-pointer transition-all',
                  activeProvider?.metadata.id === wallet.metadata.id ? 'bg-[#0DAC5C]' : 'bg-white',
                  'hover:bg-[#0DAC5C]',
                )}
                key={wallet.metadata.id}
                onClick={() => setActiveProvider(wallet)}
              >
                <img
                  className="w-12 h-12 rounded-[48px]"
                  src={wallet.metadata.icon}
                  alt={`${wallet.metadata.name} icon`}
                />
                <span
                  className={classNames(
                    'text-sm font-geist font-[500] text-[#101928]',
                    'group-hover:text-[#FFF]',
                    activeProvider?.metadata.id === wallet.metadata.id ? 'text-[#FFF]' : '',
                  )}
                >
                  {wallet.metadata.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          disabled={!activeProvider}
          onClick={() => activeProvider?.connect()}
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );
};
