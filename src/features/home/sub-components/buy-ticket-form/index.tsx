'use client';

import classNames from 'classnames';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '@/components/buttons';
import { TravelRouteSelector } from '@/components/travel-route-selector';
import { IPassengers } from '@/interface/ticket.interface';
import { PassengersSelector } from '@/components/passengers-selector';
import { DateInput } from '@/components/date-input';
import { ConfirmationModal } from '../confirmation-modal';
import { useTicketActions } from '@/actions/tickets';
import { IRoute } from '@/interface/route.interface';
import { useSetRecoilState } from 'recoil';
import { ConnectWalletVisibleAtom } from '@/state';
import { useWallet } from '@txnlab/use-wallet';

export const BuyTicketForm = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const setConnectWallet = useSetRecoilState(ConnectWalletVisibleAtom);
  const { activeAddress } = useWallet();
  const [tab, setTab] = useState<'One-way' | 'Round trip'>('One-way');
  const [route, setRoute] = useState<IRoute>();
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const { getAllRoutes } = useTicketActions();
  const [passengers, setPassengers] = useState<IPassengers>({
    adult: 0,
    child: 0,
    infant: 0,
  });

  const numberOfPassengers = Object.keys(passengers).reduce(
    (acc, k) => acc + (passengers as any)[k],
    0,
  );

  useEffect(() => {
    getAllRoutes();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        {/* <div className={styles.tabs}>
          <div
            className={classNames(styles.tab, tab === 'One-way' ? styles.active : '')}
            onClick={() => setTab('One-way')}
          >
            One-way
          </div>
          <div
            className={classNames(styles.tab, tab === 'Round trip' ? styles.active : '')}
            onClick={() => setTab('Round trip')}
          >
            Round trip
          </div>
        </div> */}
        <div className="flex flex-col px-6 gap-[10px]">
          <TravelRouteSelector selectedRoute={route} onSelectRoute={setRoute} />
          <div className="flex flex-row gap-[10px]">
            <div className="flex flex-col flex-1 transition-all">
              <PassengersSelector passengers={passengers} setPassengers={setPassengers} />
            </div>
            <div className="flex flex-col flex-1 transition-all">
              <DateInput date={departureDate} onChange={setDepartureDate} label="Departure date" />
            </div>
            {tab === 'Round trip' && (
              <div className="flex flex-col flex-1 transition-all">
                <DateInput date={returnDate} onChange={setReturnDate} label="Return date" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.button}>
          <Button
            disabled={numberOfPassengers === 0 || !route || !departureDate}
            variant="solid"
            size="sm"
            onClick={() => {
              if (!activeAddress) {
                setConnectWallet(true);
                return;
              }

              setShowConfirmationModal(true);
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      {showConfirmationModal && !!route && (
        <ConfirmationModal
          data={{
            route,
            departureDate,
            passengers,
          }}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};
