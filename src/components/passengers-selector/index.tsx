'use client';

import classNames from 'classnames';
import { RxCaretDown } from 'react-icons/rx';
import { Dispatch, SetStateAction, useState } from 'react';
import { IPassengers } from '@/interface/ticket.interface';

interface Props {
  passengers: IPassengers;
  setPassengers: Dispatch<SetStateAction<IPassengers>>;
}

export const PassengersSelector = ({ passengers, setPassengers }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const passengerTypes: Array<keyof IPassengers> = ['adult', 'child', 'infant'];
  const passengerAge: Record<keyof IPassengers, string> = {
    adult: '12 years +',
    child: '2 - 12 years',
    infant: '3 days - 2 years',
  };

  const noOfPassengers = Object.keys(passengers).reduce(
    (acc, k) => acc + (passengers as any)[k],
    0,
  );

  const handleChange = (type: 'add' | 'minus', key: keyof IPassengers) => {
    if (type === 'add') {
      setPassengers((prev) => ({ ...prev, [key]: Math.min(prev[key] + 1, 10) }));
    } else {
      setPassengers((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
    }
  };

  return (
    <div className="flex flex-col relative gap-1">
      <div className="font-geist text-sm font-[500] text-[#101928]">Number of passengers</div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'flex flex-row justify-between items-center rounded-[6px] border-[1px]',
          'border-[#D0D5DD] bg-white py-[18px] px-4 cursor-pointer',
        )}
      >
        <span
          className={classNames(
            'font-[400] text-sm font-geist',
            noOfPassengers > 0 ? 'text-[#101928]' : 'text-[#98A2B3]',
          )}
        >
          {noOfPassengers}
        </span>
        <RxCaretDown
          className={classNames(
            'min-w-5 min-h-5 text-[#667185] transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </div>
      <div
        className={classNames(
          'w-[100%] absolute top-[110%] z-10 flex flex-col transition-all',
          'bg-white border-[1px] pb-1 rounded-lg border-[#E4E7EC] overflow-hidden',
          isOpen ? 'opacity-[1]' : 'opacity-[0]',
          isOpen ? 'max-h-[280px]' : 'max-h-[0] pb-0',
        )}
      >
        {passengerTypes.map((passengerType) => (
          <div
            key={passengerType}
            className={classNames('px-4 py-[11px] flex flex-row, items-center justify-between')}
          >
            <div className="flex flex-col">
              <div className="text-[#101928] font-[400] text-sm font-geist capitalize">
                {passengerType}
              </div>
              <div className="text-[#667185] font-[400] text-sm font-geist">
                {passengerAge[passengerType]}
              </div>
            </div>

            <div
              className={classNames(
                'flex flex-row items-center border-[1px] border-[#98A2B3]',
                'py-[10px] px-[22px] rounded-[40px] gap-4',
              )}
            >
              <div
                onClick={() => handleChange('minus', passengerType)}
                className="cursor-pointer font-[500] text-[18px] leading-[26px] text-[#344054] font-geist select-none"
              >
                -
              </div>
              <div className="font-[700] text-base font-geist text-[#101928] select-none">
                {passengers[passengerType]}
              </div>
              <div
                onClick={() => handleChange('add', passengerType)}
                className="cursor-pointer font-[500] text-[18px] leading-[26px] text-[#344054] font-geist select-none"
              >
                +
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
