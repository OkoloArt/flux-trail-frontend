'use client';

import { OverviewItem } from '@/components/overview-item.tsx';
import { AlgorandIcon } from '@/assets';
import { useRecoilValue } from 'recoil';
import { RefreshRoutesAtom, TicketsStatisticsAtom } from '@/state/route.atom';
import Skeleton from 'react-loading-skeleton';
import { useAdminRouteActions } from '@/actions/admin-routes';
import { useEffect } from 'react';

export const RoutesOverview = () => {
  const statistics = useRecoilValue(TicketsStatisticsAtom);
  const refreshRoutes = useRecoilValue(RefreshRoutesAtom);
  const { getTicketsStatistics } = useAdminRouteActions();

  useEffect(() => {
    getTicketsStatistics();
  }, [refreshRoutes]);

  return (
    <div className="flex flex-row gap-[27px]">
      <OverviewItem
        title="Total Routes Created"
        value={<>{!statistics ? <Skeleton width={150} /> : statistics.totalRoutes}</>}
      />
      <OverviewItem
        title="Total Revenue"
        value={
          <div className="flex flex-row items-center gap-[10px]">
            <AlgorandIcon className="w-8 h-8" />
            <span>{statistics ? statistics.totalRevenue : <Skeleton width={150} />}</span>
          </div>
        }
      />
    </div>
  );
};
