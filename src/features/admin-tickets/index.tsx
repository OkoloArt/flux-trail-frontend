'use client';

import styles from './index.module.scss';
import { Footer } from '@/components/footer';
import { AdminNavbar } from '@/components/admin-navbar';
import { OverviewItem } from '@/components/overview-item.tsx';
import { AlgorandIcon } from '@/assets';
import { TicketsTable } from './tickets-table';
import { useRecoilValue } from 'recoil';
import { RefreshRoutesAtom, TicketsStatisticsAtom } from '@/state/route.atom';
import { useAdminRouteActions } from '@/actions/admin-routes';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

export const AdminTicketsManager = () => {
  const statistics = useRecoilValue(TicketsStatisticsAtom);
  const refreshRoutes = useRecoilValue(RefreshRoutesAtom);
  const { getTicketsStatistics } = useAdminRouteActions();

  useEffect(() => {
    getTicketsStatistics();
  }, [refreshRoutes]);

  return (
    <main className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <div className={styles.inner_content}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-[2px]">
                <div className="font-geist font-[600] text-[32px] leading-[38.4px] text-[#1D2739]">
                  Tickets Manager
                </div>
                <div className="font-geist font-[400] text-[18px] leading-[26px] text-[#98A2B3]">
                  View all user tickets created here
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-[27px]">
              <OverviewItem
                title="Top Tickets Sold"
                value={<>{!statistics ? <Skeleton width={150} /> : statistics.totalTickets}</>}
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
          </div>
          <TicketsTable />
        </div>
      </div>
      <Footer />
    </main>
  );
};
