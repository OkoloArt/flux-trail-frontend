'use client';

import { UserNavbar } from '@/components/user-navbar';
import styles from './index.module.scss';
import { Footer } from '@/components/footer';
import { Button } from '@/components/buttons';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { Tickets } from './sub-components/tickets';

export const TicketHistory = () => {
  return (
    <main className={styles.container}>
      <UserNavbar />
      <div className={styles.content}>
        <div className={styles.inner_content}>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-[2px]">
              <div className="font-geist font-[600] text-[32px] leading-[38.4px] text-[#1D2739]">
                Ticket History
              </div>
              <div className="font-geist font-[400] text-[18px] leading-[26px] text-[#98A2B3]">
                View and manage all your past tickets here
              </div>
            </div>
            <Link href="/">
              <Button className="w-[207px]">
                <FaPlus size={16} /> <span>Create New Ticket</span>
              </Button>
            </Link>
          </div>
          <Tickets />
        </div>
      </div>
      <Footer />
    </main>
  );
};
