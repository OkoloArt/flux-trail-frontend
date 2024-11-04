import { AlgorandIcon } from '@/assets';
import { LineIcon } from '@/assets/line.icon';
import { TravelMediumIcon } from '@/assets/travel-medium.icon';
import { LuInfo } from 'react-icons/lu';
import { Button } from '@/components/buttons';
import classNames from 'classnames';
import { IRoute } from '@/interface/route.interface';
import { IPassengers } from '@/interface/ticket.interface';

interface Props {
  handleNext: () => void;
  data: {
    route: IRoute;
    departureDate: string;
    passengers: IPassengers;
  };
}

export const Overview = ({ handleNext, data }: Props) => {
  const { route, departureDate, passengers } = data;
  const { price, from, to, fromStateCode, toStateCode, fromTerminal, toTerminal, transportMedium } =
    route;

  const numberOfPassengers = Object.keys(passengers).reduce(
    (acc, k) => acc + (passengers as any)[k],
    0,
  );

  const ticketPrice = price * numberOfPassengers;

  return (
    <div className="gap-10 flex flex-col">
      <div className="font-geist text-[24px] leading-[28px] text-[#1B1818] font-[700]">
        Purchase ticket
      </div>
      <div className="flex flex-col gap-4">
        <div className="font-geist font-[400] text-[16px] leading-[23px] text-[#645D5D]">
          Available ticket
        </div>
      </div>
      <div className={'flex flex-col gap-6 '}>
        <div
          style={{ boxShadow: '0px 5px 13px -5px #1019280D' }}
          className={classNames(
            'rounded-lg p-[10px] flex flex-col gap-6',
            'border-[1px] border-[#F0F2F5]',
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="font-geist text-base font-[400] text-[#667185]">{from}</div>
              <div className="font-geist text-base font-[400] text-[#667185]">{to}</div>
            </div>
            <div className="flex flex-row items-center justify-between gap-1  flex-wrap">
              <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
                {fromStateCode}
              </div>
              <div className="flex flex-row gap-3 items-center max-w-[280px]">
                <LineIcon.Forward className="w-[80px]" />
                {transportMedium === 'air' && <TravelMediumIcon.Airplane />}
                {transportMedium === 'bus' && <TravelMediumIcon.Bus />}
                {transportMedium === 'train' && <TravelMediumIcon.Train />}
                <LineIcon.Backward className="w-[80px]" />
              </div>
              <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
                {toStateCode}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="font-geist text-base font-[400] text-[#667185]">{fromTerminal}</div>
              <div className="font-geist text-base font-[400] text-[#667185]">{toTerminal}</div>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="font-geist text-base font-[400] text-[#667185]">
                {new Date(departureDate).toDateString()}
              </div>
              <div className="font-geist text-base font-[400] text-[#667185]">...</div>
            </div>
          </div>
          <div
            className={classNames(
              'flex flex-row items-center justify-between',
              'pb-3 pt-5 border-t-[1px] border-t-[#D0D5DD] border-dashed',
            )}
          >
            <div className={classNames('font-geist text-base font-[400] text-[#667185]')}>
              Price
            </div>
            <div className="flex flex-row items-center gap-2">
              <AlgorandIcon />
              <div className="font-geist font-[500] text-[32px] leading-[46px] text-[#101928]">
                {price * numberOfPassengers}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleNext}>Buy Ticket ({ticketPrice} Algos)</Button>
          <div className="flex flex-row items-center gap-2">
            <LuInfo color="#98A2B3" />
            <div className="flex-1 text-[#98A2B3] text-sm font-geist">
              This action authorizes us to complete the transaction through your Algorand wallet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
