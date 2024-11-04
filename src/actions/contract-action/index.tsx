import { getAlgoClientConfig, getAlgodClient } from '@/utils/get-algo-client-config';
import { useWallet } from '@txnlab/use-wallet';
import { FluxTrailClient } from '@/contracts/FluxTrailClient';
import { useCallback } from 'react';
import * as algokit from '@algorandfoundation/algokit-utils';
import { CreateRouteContractDto, CreateRouteDto } from '@/interface/route.interface';
import algosdk, {
  makeAssetTransferTxnWithSuggestedParamsFromObject,
  makePaymentTxnWithSuggestedParamsFromObject,
} from 'algosdk';
import toast from 'react-hot-toast';
import { MintTicketDto } from '@/interface/ticket.interface';

export const useContractActions = () => {
  const { activeAddress, signer, signTransactions, sendTransactions } = useWallet();
  const algodClient = getAlgodClient();

  const createRouteContract = useCallback(
    async (dto: CreateRouteContractDto) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };

      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: 0,
          sender,
        },
        algodClient,
      );

      const response = await appClient.create.createApplication({
        ...dto,
        receiverAddress: activeAddress,
        price: algokit.algos(dto.price).microAlgos,
      });

      const createdContract: CreateRouteDto = {
        ...dto,
        appId: Number(response.appId),
      };

      try {
        toast.success('Route contract created successfully');
        toast.loading('Funding contract with Minimum balance requirement', { id: 'loader' });
        await fundContractWithMbr(createdContract.appId);
      } catch (error) {
        toast.error(`Failed to fund contract with Minimum balance requirement: ${error}`);
      }

      toast.dismiss('loader');

      return createdContract;
    },
    [activeAddress, signer],
  );

  const fundContractWithMbr = useCallback(
    async (appId: number) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };

      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: appId,
          sender,
        },
        algodClient,
      );

      const { appAddress } = await appClient.appClient.getAppReference();

      const paymentTxn = makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: appAddress,
        amount: 100_000,
        suggestedParams: await algodClient.getTransactionParams().do(),
      });

      const encodedTx = paymentTxn.toByte();
      const signedTxns = await signTransactions([encodedTx], [0]);

      return await sendTransactions(signedTxns);
    },
    [activeAddress, signer],
  );

  const deleteRouteContract = useCallback(
    async (appId: number) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };

      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: appId,
          sender,
        },
        algodClient,
      );

      const response = await appClient.delete.deleteApplication({});

      return response;
    },
    [activeAddress, signer],
  );

  const optInToApplication = useCallback(
    async (appId: number) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };

      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: appId,
          sender,
        },
        algodClient,
      );

      return await appClient.optIn.optInToApplication({}, { sender });
    },
    [activeAddress, signer],
  );

  const mintTicketAsa = useCallback(
    async (dto: MintTicketDto) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };
      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: dto.appId,
          sender,
        },
        algodClient,
      );

      const suggestedParams = await algokit.getTransactionParams(undefined, algodClient);
      const { appAddress } = await appClient.appClient.getAppReference();
      const appInfo = await algokit.getAppById(dto.appId, algodClient);
      const creator = appInfo.params.creator;

      const paymentTxn = makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: appAddress,
        amount: algokit.algos(dto.price * dto.numberOfTickets).microAlgos + 100_000,
        suggestedParams,
      });

      await appClient.mintTicket(
        {
          paymentTxn: {
            transaction: paymentTxn,
            signer: sender,
          },
          ipfsUrl: dto.ipfsUrl,
          numberOfTickets: dto.numberOfTickets,
        },
        {
          sender,
          sendParams: {
            fee: algokit.microAlgos(3_000),
          },
          accounts: [creator],
        },
      );

      return {
        buyerAddress: activeAddress,
      };
    },
    [activeAddress, signer],
  );

  const claimTicketAsa = useCallback(
    async (appId: number) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };
      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: appId,
          sender,
        },
        algodClient,
      );

      const assetId = (await appClient.getLocalState(activeAddress)).ticket?.asNumber();
      await algokit.assetOptIn({ account: sender, assetId: assetId! }, algodClient);

      await appClient.claimTicket(
        {},
        {
          sender,
          sendParams: {
            fee: algokit.microAlgos(2_000),
          },
          assets: [assetId!],
        },
      );

      return { assetId: assetId! };
    },
    [activeAddress, signer],
  );

  const useTicketAsa = useCallback(
    async (appId: number, assetId: number) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };
      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: appId,
          sender,
        },
        algodClient,
      );

      return await appClient.useTicket(
        { assetID: assetId },
        {
          sender,
          sendParams: {
            fee: algokit.microAlgos(2_000),
          },
          assets: [assetId],
        },
      );
    },
    [activeAddress, signer],
  );

  const burnTicketAsa = useCallback(
    async (appId: number, assetId: number) => {
      if (!activeAddress || !signer) {
        throw new Error('No wallet connected');
      }

      const sender = { signer, addr: activeAddress };
      const appClient = new FluxTrailClient(
        {
          resolveBy: 'id',
          id: appId,
          sender,
        },
        algodClient,
      );

      const { appAddress } = await appClient.appClient.getAppReference();
      const suggestedParams = await algokit.getTransactionParams(undefined, algodClient);

      const optOutTxn = makeAssetTransferTxnWithSuggestedParamsFromObject({
        assetIndex: assetId,
        amount: 0,
        closeRemainderTo: appAddress,
        from: activeAddress,
        to: appAddress,
        suggestedParams,
      });

      return await appClient.burnTicket(
        {
          optOutTxn: {
            transaction: optOutTxn,
            signer: sender,
          },
        },
        {
          sender: sender,
          sendParams: {
            fee: algokit.microAlgos(2_000),
          },
          assets: [assetId],
        },
      );
    },
    [activeAddress, signer],
  );

  return {
    createRouteContract,
    deleteRouteContract,
    optInToApplication,
    mintTicketAsa,
    claimTicketAsa,
    useTicketAsa,
    burnTicketAsa,
  };
};
