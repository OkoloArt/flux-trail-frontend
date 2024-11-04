'use client';

import classNames from 'classnames';
import { BackgroundOverlay } from '../background-overlay';
import { FluxTrailLogo } from '@/assets/flux-trail-logo.icon';
import { LineIcon } from '@/assets/line.icon';
import { TravelMediumIcon } from '@/assets/travel-medium.icon';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import * as algokit from '@algorandfoundation/algokit-utils';
import Skeleton from 'react-loading-skeleton';
import { useTicketActions } from '@/actions/tickets';
import { Ticket } from '@/interface/ticket.interface';
import { capitaliseText } from '@/utils/capitalise-text';
import { LuPrinter } from 'react-icons/lu';
import { Button } from '../buttons';
import { useWallet } from '@txnlab/use-wallet';
import { getAlgodClient } from '@/utils/get-algo-client-config';
import { useContractActions } from '@/actions/contract-action';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';

interface Props {
  asaId: string;
  onClose: () => void;
  visible: boolean;
}

export const TicketDetailsModal = ({ asaId, onClose, visible }: Props) => {
  const [ticket, setTicket] = useState<Ticket>();
  const [viewerHoldsAsset, setViewerHoldsAsset] = useState(false);
  const { useTicketAsa } = useContractActions();
  const [printingTicket, setPrintingTicket] = useState(false);
  const { useTicket } = useTicketActions();
  const ref = useRef<HTMLDivElement>(null);
  const { activeAddress } = useWallet();
  const { getTicketByAssetId } = useTicketActions();
  const algod = getAlgodClient();
  const loading = !ticket;

  const getTicket = async () => {
    const ticket = await getTicketByAssetId(Number(asaId));
    if (ticket) setTicket(ticket);
  };

  const checkIfViewerHoldsAsset = async () => {
    if (!activeAddress || !ticket) return;

    try {
      const accountInfo = await algod.accountAssetInformation(activeAddress, ticket.assetId).do();

      if (accountInfo['asset-holding'].amount > 0 && !accountInfo['asset-holding']['is-frozen']) {
        setViewerHoldsAsset(true);
      }
    } catch (error) {}
  };

  const printTicket = async () => {
    if (printingTicket || !ticket || !activeAddress) return;

    setPrintingTicket(true);

    try {
      await useTicketAsa(ticket.appId, ticket.assetId);
    } catch (error) {
      setPrintingTicket(false);
      toast.error(`${error}`);
      return;
    }

    const res = await useTicket(ticket.id);
    setPrintingTicket(false);

    if (res) {
      setTicket(res);
      await downloadTicket();
      toast.success('Ticket downloaded successfully');
    }
  };

  const downloadTicket = async () => {
    if (!ref.current || !ticket) return;

    const canvas = await html2canvas(ref.current, { scale: 1 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${ticket.from}-to-${ticket.to}-#${ticket.assetId}.png`;
    link.click();
  };

  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    checkIfViewerHoldsAsset();
  }, [ticket, activeAddress]);

  return (
    <BackgroundOverlay
      visible={visible}
      onClose={onClose}
      overlayStyle={{ background: 'rgba(0, 0, 0, 0.8)' }}
    >
      <div className="w-[528px] flex flex-col gap-5">
        <div
          style={{
            boxShadow: '0px 5px 13px -5px #1019280D',
          }}
          ref={ref}
          className={classNames('rounded-lg flex flex-col overflow-hidden w-[528px]')}
        >
          <div
            className={classNames(
              'flex flex-row gap-[6px] items-center',
              'px-[10px] pt-6 pb-6 bg-white',
            )}
          >
            <FluxTrailLogo className="w-[28.5px] h-[33px]" />
            <div className="font-satoshi font-[700] text-[24px] leading-8 text-[#344054]">
              FluxTrail
            </div>
          </div>
          <div className="flex flex-col gap-2 px-[10px] pb-6 bg-white">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="font-geist text-base font-[400] text-[#667185]">
                {loading ? <Skeleton width={100} /> : ticket.from}
              </div>
              <div className="font-geist text-base font-[400] text-[#667185]">
                {loading ? <Skeleton width={100} /> : ticket.to}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-1  flex-wrap">
              <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
                {loading ? <Skeleton width={100} /> : ticket.fromStateCode}
              </div>
              <div className="flex flex-row gap-3 items-center max-w-[280px]">
                <LineIcon.Forward className="w-[80px]" />
                {ticket?.transportMedium === 'air' && <TravelMediumIcon.Airplane />}
                {ticket?.transportMedium === 'bus' && <TravelMediumIcon.Bus />}
                {ticket?.transportMedium === 'train' && <TravelMediumIcon.Train />}
                <LineIcon.Backward className="w-[80px]" />
              </div>
              <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
                {loading ? <Skeleton width={100} /> : ticket.toStateCode}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="font-geist text-base font-[400] text-[#667185]">
                {loading ? <Skeleton width={200} /> : ticket.fromTerminal}
              </div>
              <div className="font-geist text-base font-[400] text-[#667185]">
                {loading ? <Skeleton width={200} /> : ticket.toTerminal}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="font-geist text-base font-[400] text-[#667185]">
                {loading ? <Skeleton width={150} /> : '---'}
              </div>
              <div className="font-geist text-base font-[400] text-[#667185]">
                {loading ? <Skeleton width={150} /> : '---'}
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'flex flex-col pt-3 border-t-[1px] bg-white relative',
              'border-t-[#F0F2F5] gap-0 px-[10px] pb-6',
            )}
          >
            <div className="flex flex-row justify-between gap-2 py-3">
              <div className="font-geist text-base font-[400] text-[#667185]">ASA ID</div>
              <div className="font-geist text-base font-[400] text-[#101928]">
                {loading ? <Skeleton width={100} /> : `#${ticket.assetId}`}
              </div>
            </div>
            <div className="flex flex-row justify-between gap-2 py-3">
              <div className="font-geist text-base font-[400] text-[#667185]">Ticket type</div>
              <div className="font-geist text-base font-[400] text-[#101928]">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  `${
                    ticket.transportMedium === 'air'
                      ? 'Plane'
                      : capitaliseText(ticket.transportMedium)
                  } ticket`
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between gap-2 py-3">
              <div className="font-geist text-base font-[400] text-[#667185]">
                Number of passengers
              </div>
              <div className="font-geist text-base font-[400] text-[#101928]">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  `${ticket.numberOfAdults} Adult${ticket.numberOfAdults === 1 ? '' : 's'}, ${
                    ticket.numberOfChildren
                  } Child${ticket.numberOfChildren === 1 ? '' : 'ren'}, ${
                    ticket.numberOfInfants
                  } Infant${ticket.numberOfInfants === 1 ? '' : 's'}`
                )}
              </div>
            </div>

            <div
              className={classNames(
                'w-6 h-6 rounded-[24px] bg-[#F0F2F5]',
                'absolute top-[-12px] left-[-12px]',
              )}
            />

            <div
              className={classNames(
                'w-6 h-6 rounded-[24px] bg-[#F0F2F5]',
                'absolute top-[-12px] right-[-12px]',
              )}
            />
          </div>
        </div>

        {!ticket?.used && viewerHoldsAsset && (
          <div className="flex flex-col gap-2">
            <Button onClick={printTicket} loading={printingTicket}>
              <LuPrinter />
              <span>Print Ticket</span>
            </Button>
            <div className="flex flex-row items-center justify-center gap-2">
              <MdOutlineInfo className="w-6 h-6 text-[#F0F2F5]" />
              <span className="font-geist font-[400] text-sm text-[#F0F2F5]">
                This ticket can only be downloaded once. Ensure you keep the file safe{' '}
              </span>
            </div>
          </div>
        )}
      </div>
    </BackgroundOverlay>
  );
};
