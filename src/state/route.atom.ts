import { IRoute, TicketsStatistics } from '@/interface/route.interface';
import { atom } from 'recoil';

export const TicketsStatisticsAtom = atom<TicketsStatistics | null>({
  default: null,
  key: 'TicketsStatisticsAtom',
});

export const RefreshRoutesAtom = atom<number>({
  default: 0,
  key: 'RefreshRoutes',
});

export const AllRoutesAtom = atom<IRoute[] | null>({
  default: null,
  key: 'AllRoutesAtom',
});
