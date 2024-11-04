import { IRoute as Route } from './route.interface';

export type IPassengerType = 'adult' | 'child' | 'infant';

export type IPassengers = Record<IPassengerType, number>;

export interface MintTicketDto {
  routeId: string;
  appId: number;
  numberOfTickets: number;
  price: number;
  ipfsUrl: string;
}

export interface CreateTicketDto {
  assetId: number;
  buyerAddress: string;
  routeId: string;
  departureDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfInfants: number;
  ipfsUrl: string;
}
export interface Ticket extends Route {
  assetId: number;
  buyerAddress: string;
  routeId: string;
  departureDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfInfants: number;
  used: boolean;
  ipfsUrl: string;
}

export interface GetTicketsDto {
  order?: 'asc' | 'desc';
  page?: number;
  numOfItemsPerPage?: number;
  searchTerm?: string;
  used?: string;
}
