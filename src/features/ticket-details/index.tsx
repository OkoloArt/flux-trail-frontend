'use client';

import { TicketDetailsModal } from '@/components/ticket-details-modal';
import { Home } from '../home';
import { useParams, useRouter } from 'next/navigation';

export const TicketDetailsPage = () => {
  const { ['asa-id']: asaId } = useParams();
  const { push } = useRouter();

  return (
    <>
      <Home />
      <TicketDetailsModal visible onClose={() => push('/')} asaId={String(asaId)} />
    </>
  );
};
