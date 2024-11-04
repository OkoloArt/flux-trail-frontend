export type TransportMedium = 'air' | 'train' | 'bus';

export interface IRoute {
  id: string;
  createdAt: string;
  appId: number;
  price: number;
  transportMedium: TransportMedium;
  from: string;
  fromStateCode: string;
  fromTerminal: string;
  to: string;
  toStateCode: string;
  toTerminal: string;
}

export interface CreateRouteContractDto {
  price: number;
  transportMedium: TransportMedium;
  from: string;
  fromStateCode: string;
  fromTerminal: string;
  to: string;
  toStateCode: string;
  toTerminal: string;
}

export interface CreateRouteDto extends CreateRouteContractDto {
  appId: number;
}

export interface UpdateRouteDto {
  appId?: number;
  price?: number;
  transportMedium?: TransportMedium;
  from?: string;
  fromStateCode?: string;
  fromTerminal?: string;
  to?: string;
  toStateCode?: string;
  toTerminal?: string;
}

export interface GetRoutesDto {
  order?: 'asc' | 'desc';
  page?: number;
  numOfItemsPerPage?: number;
  searchTerm?: string;
}

export interface TicketsStatistics {
  totalTickets: number;
  totalRevenue: number;
  totalRoutes: number;
}
