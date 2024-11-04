'use client';

import classNames from 'classnames';
import { RxCaretDown } from 'react-icons/rx';
import { useState } from 'react';
import { DropDown } from './drop-down';
import { IRoute } from '@/interface/route.interface';
import { useRecoilValue } from 'recoil';
import { AllRoutesAtom } from '@/state/route.atom';

interface Props {
  selectedRoute?: IRoute;
  onSelectRoute: (route: IRoute) => void;
}

export const TravelRouteSelector = ({ selectedRoute, onSelectRoute }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const allRoutes = useRecoilValue(AllRoutesAtom);

  return (
    <div className="flex flex-col relative gap-1">
      <div className="font-geist text-sm font-[500] text-[#101928]">Select travel route</div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row justify-between items-center rounded-[6px] border-[1px] border-[#D0D5DD] bg-white py-[18px] px-4 cursor-pointer"
      >
        <span
          className={classNames(
            'font-[400] text-sm font-geist',
            selectedRoute ? 'text-[#101928]' : 'text-[#98A2B3] ',
          )}
        >
          {selectedRoute ? `${selectedRoute.from} to ${selectedRoute.to}` : 'Select route'}
        </span>
        <RxCaretDown
          className={classNames(
            'min-w-5 min-h-5 text-[#667185] transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </div>

      <DropDown
        selectedRoute={selectedRoute}
        onSelectRoute={onSelectRoute}
        onClose={() => setIsOpen(false)}
        visible={isOpen && !!allRoutes}
      />
    </div>
  );
};
