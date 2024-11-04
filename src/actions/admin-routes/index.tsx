import { useClient } from '@/hooks/use-client';
import { PaginationResponse } from '@/interface/pagination.interface';
import {
  CreateRouteDto,
  GetRoutesDto,
  IRoute,
  TicketsStatistics,
  UpdateRouteDto,
} from '@/interface/route.interface';
import { GetTicketsDto, Ticket } from '@/interface/ticket.interface';
import { TicketsStatisticsAtom } from '@/state/route.atom';
import { generateQueryFromObject } from '@/utils';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

export const useAdminRouteActions = () => {
  const client = useClient();
  const setTicketsStatistics = useSetRecoilState(TicketsStatisticsAtom);

  const createRoute = async (dto: CreateRouteDto) => {
    const response = await client.post<IRoute>('/flux-trail/admin/route', dto);

    if (response.data) {
      return response.data;
    }

    toast.error(`Failed to create route: ${response.error}`);
  };

  const updateRoute = async (id: string, dto: UpdateRouteDto) => {
    const response = await client.patch<IRoute>(`/flux-trail/admin/route/${id}`, dto);

    if (response.data) {
      return response.data;
    }

    toast.error(`Failed to create route: ${response.error}`);
  };

  const getRouteById = async (id: string) => {
    const response = await client.get<IRoute>(`/flux-trail/admin/route/${id}`);

    if (response.data) {
      return response.data;
    }

    toast.error(`Failed to retrieve route: ${response.error}`);
  };

  const deleteRoute = async (id: string) => {
    const response = await client.delete(`/flux-trail/admin/route/${id}`);

    if (response.data) {
      return response.data;
    }

    toast.error(`Failed to retrieve route: ${response.error}`);
  };

  const getAllRoutes = async (dto: GetRoutesDto) => {
    const query = generateQueryFromObject(dto);
    const url = `/flux-trail/admin/routes?${query}`;

    const response = await client.get<PaginationResponse<IRoute>>(url);

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const getTicketsStatistics = async () => {
    const url = `/flux-trail/admin/tickets/statistics`;

    const response = await client.get<TicketsStatistics>(url);

    if (response.data) {
      setTicketsStatistics(response.data);
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const getAllTickets = async (dto: GetTicketsDto) => {
    const query = generateQueryFromObject(dto);
    const url = `/flux-trail/admin/tickets?${query}`;

    const response = await client.get<PaginationResponse<Ticket>>(url);

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  return {
    createRoute,
    getRouteById,
    deleteRoute,
    updateRoute,
    getAllRoutes,
    getTicketsStatistics,
    getAllTickets,
  };
};
