import { FluxTrailLogo } from '@/assets/flux-trail-logo.icon';
import { LineIcon } from '@/assets/line.icon';
import { TravelMediumIcon } from '@/assets/travel-medium.icon';
import { Ticket } from '@/interface/ticket.interface';
import { capitaliseText } from '@/utils/capitalise-text';
import classNames from 'classnames';
import { RefObject } from 'react';

interface Props {
  ticket: Partial<Ticket>;
}

export const DetailsToImagify = ({ ticket }: Props) => {
  return (
    <div
      style={{
        boxShadow: '0px 5px 13px -5px #1019280D',
      }}
      id="details-to-imagify"
      className={classNames('max-w-[528px] rounded-lg flex flex-col overflow-hidden w-[528px]')}
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
          <div className="font-geist text-base font-[400] text-[#667185]">{ticket.from}</div>
          <div className="font-geist text-base font-[400] text-[#667185]">{ticket.to}</div>
        </div>
        <div className="flex flex-row items-center justify-between gap-1  flex-wrap">
          <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
            {ticket.fromStateCode}
          </div>
          <div className="flex flex-row gap-3 items-center max-w-[280px]">
            <LineIcon.Forward className="w-[80px]" />
            {ticket?.transportMedium === 'air' && <TravelMediumIcon.Airplane />}
            {ticket?.transportMedium === 'bus' && <TravelMediumIcon.Bus />}
            {ticket?.transportMedium === 'train' && <TravelMediumIcon.Train />}
            <LineIcon.Backward className="w-[80px]" />
          </div>
          <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
            {ticket.toStateCode}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="font-geist text-base font-[400] text-[#667185]">
            {ticket.fromTerminal}
          </div>
          <div className="font-geist text-base font-[400] text-[#667185]">{ticket.toTerminal}</div>
        </div>
      </div>
      <div
        className={classNames(
          'flex flex-col pt-3 border-t-[1px] bg-white relative',
          'border-t-[#F0F2F5] gap-0 px-[10px] pb-6',
        )}
      >
        <div className="flex flex-row justify-between gap-2 py-3">
          <div className="font-geist text-base font-[400] text-[#667185]">Ticket type</div>
          <div className="font-geist text-base font-[400] text-[#101928]">
            {`${
              ticket.transportMedium === 'air' ? 'Plane' : capitaliseText(ticket.transportMedium!)
            } ticket`}
          </div>
        </div>
        <div className="flex flex-row justify-between gap-2 py-3">
          <div className="font-geist text-base font-[400] text-[#667185]">Number of passengers</div>
          <div className="font-geist text-base font-[400] text-[#101928]">
            {`${ticket.numberOfAdults} Adult${ticket.numberOfAdults === 1 ? '' : 's'}, ${
              ticket.numberOfChildren
            } Child${ticket.numberOfChildren === 1 ? '' : 'ren'}, ${ticket.numberOfInfants} Infant${
              ticket.numberOfInfants === 1 ? '' : 's'
            }`}
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
  );
};
