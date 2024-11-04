import { useClient } from '@/hooks/use-client';
import { Token } from '@/interface';
import { authAtom } from '@/state';
import { getAlgodClient } from '@/utils/get-algo-client-config';
import { useWallet } from '@txnlab/use-wallet';
import algosdk from 'algosdk';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

export const useAdminAuthActions = () => {
  const client = useClient();
  const setAuth = useSetRecoilState(authAtom);
  const { signer, activeAddress, signTransactions } = useWallet();
  const algodClient = getAlgodClient();

  const signAuthTransaction = useCallback(async () => {
    if (!signer || !activeAddress) {
      toast.error('No signer or active address found');
      return;
    }

    const sender = { signer, addr: activeAddress };

    const suggestedParams = await algodClient.getTransactionParams().do();
    const authTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender.addr,
      to: sender.addr,
      amount: 0,
      suggestedParams: {
        ...suggestedParams,
        fee: 0,
        flatFee: true,
      },
    });

    // encode and sign auth txn
    const encodedTx = authTxn.toByte();

    try {
      const signedTxn = (await signTransactions([encodedTx], [0]))[0];
      const signedTxnBase64 = Buffer.from(signedTxn).toString('base64');

      return signedTxnBase64;
    } catch (error) {
      toast.error(`Failed to sign auth transaction: ${error}`);
    }
  }, [signer, activeAddress]);

  const login = useCallback(async (authTxnBase64: string) => {
    const response = await client.post<Token>('/flux-trail/admin/auth/login', {
      authTxnBase64,
    });

    if (response.data?.accessToken) {
      localStorage.setItem('auth', JSON.stringify(response.data));
      setAuth(response.data);
      return response.data;
    }

    toast.error(String(response.error));
  }, []);

  return {
    signAuthTransaction,
    login,
  };
};
