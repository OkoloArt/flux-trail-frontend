import { useClient } from '@/hooks/use-client';
import { PaginationResponse } from '@/interface/pagination.interface';
import { IRoute } from '@/interface/route.interface';
import { CreateTicketDto, GetTicketsDto, Ticket } from '@/interface/ticket.interface';
import { AllRoutesAtom } from '@/state/route.atom';
import { generateQueryFromObject } from '@/utils';
import { useWallet } from '@txnlab/use-wallet';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

export const useTicketActions = () => {
  const client = useClient();
  const setAllRoutes = useSetRecoilState(AllRoutesAtom);
  const { activeAddress } = useWallet();

  const getAllRoutes = async () => {
    const response = await client.get<IRoute[]>('/flux-trail/routes');

    if (response.data) {
      setAllRoutes(response.data);
      return response.data;
    }

    toast.error(`Failed to retrieve routes: ${response.error}`);
  };

  const getTicketByAssetId = async (assetId: number) => {
    const response = await client.get<Ticket>(`/flux-trail/ticket/${assetId}`);

    if (response.data) {
      return response.data;
    }

    toast.error(`Failed to retrieve route: ${response.error}`);
  };

  const createTicket = async (dto: CreateTicketDto) => {
    const response = await client.post<Ticket>('/flux-trail/ticket', dto);

    if (response.data) {
      return response.data;
    }

    toast.error(`Failed to create ticket: ${response.error}`);
  };

  const useTicket = useCallback(
    async (id: string) => {
      if (!activeAddress) {
        toast.error('No wallet connected');
        return;
      }

      const url = `/flux-trail/ticket/use`;
      const response = await client.post<Ticket>(url, {
        ticketId: id,
        ownerAddress: activeAddress,
      });

      if (response.data) {
        return response.data;
      }

      toast.error(`Failed to use ticket: ${response.error}`);
    },
    [activeAddress],
  );

  const burnTicket = useCallback(
    async (id: string) => {
      if (!activeAddress) {
        toast.error('No wallet connected');
        return;
      }

      const url = `/flux-trail/ticket/burn`;
      const response = await client.delete(url, { ticketId: id, ownerAddress: activeAddress });

      if (response.data) {
        return response.data;
      }

      toast.error(`Failed to burn ticket: ${response.error}`);
    },
    [activeAddress],
  );

  const getAllTickets = useCallback(
    async (dto: GetTicketsDto) => {
      if (!activeAddress) {
        toast.error('No wallet connected');
        return;
      }

      const query = generateQueryFromObject(dto);
      const url = `/flux-trail/tickets/${activeAddress}?${query}`;
      const response = await client.get<PaginationResponse<Ticket>>(url);

      if (response.data) {
        return response.data;
      }

      toast.error(`Failed to retrieve tickets: ${response.error}`);
    },
    [activeAddress],
  );

  return {
    getAllRoutes,
    getTicketByAssetId,
    createTicket,
    useTicket,
    burnTicket,
    getAllTickets,
  };
};
