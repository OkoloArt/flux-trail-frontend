'use client';

import { UserNavbar } from '@/components/user-navbar';
import styles from './index.module.scss';
import { Footer } from '@/components/footer';
import { BuyTicketForm } from './sub-components';

export const Home = () => {
  return (
    <main className={styles.container}>
      <UserNavbar />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Travel fast and <span>smart</span> with blockchain-powered tickets
        </h1>
        <BuyTicketForm />
      </div>
      <Footer />
    </main>
  );
};
