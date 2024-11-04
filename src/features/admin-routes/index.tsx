'use client';

import styles from './index.module.scss';
import { Footer } from '@/components/footer';
import { Button } from '@/components/buttons';
import { FaPlus } from 'react-icons/fa';
import { RoutesOverview } from './routes-overview';
import { RoutesTable } from './routes-table';
import { AdminNavbar } from '@/components/admin-navbar';
import { useState } from 'react';
import { CreateRoute } from './create-route';

export const AdminRoutesManager = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <main className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <div className={styles.inner_content}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-[2px]">
                <div className="font-geist font-[600] text-[32px] leading-[38.4px] text-[#1D2739]">
                  Routes Manager
                </div>
                <div className="font-geist font-[400] text-[18px] leading-[26px] text-[#98A2B3]">
                  Create, edit and delete routes here
                </div>
              </div>
              <Button className="w-[207px]" onClick={() => setShowCreateModal(true)}>
                <FaPlus size={16} /> <span>Create New Route</span>
              </Button>
            </div>
            <RoutesOverview />
          </div>
          <RoutesTable />
        </div>
      </div>
      <Footer />

      <CreateRoute visible={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </main>
  );
};
