'use client';

import classNames from 'classnames';
import { useState } from 'react';
import { TravelMediumIcon } from '@/assets/travel-medium.icon';
import { IRoute, TransportMedium } from '@/interface/route.interface';
import { useRecoilValue } from 'recoil';
import { AllRoutesAtom } from '@/state/route.atom';
import { capitaliseText } from '@/utils/capitalise-text';

interface Props {
  visible: boolean;
  selectedRoute?: IRoute;
  onSelectRoute: (route: IRoute) => void;
  onClose: () => void;
}

export const DropDown = ({ visible, selectedRoute, onSelectRoute, onClose }: Props) => {
  const [medium, setMedium] = useState<TransportMedium>('air');
  const mediums: TransportMedium[] = ['air', 'train', 'bus'];
  const allRoutes = useRecoilValue(AllRoutesAtom);

  const generateDescriptionFromRoute = (route: IRoute) => {
    const { transportMedium } = route;

    if (transportMedium === 'air') {
      return `Flight from ${route.fromTerminal} to ${route.toTerminal}`;
    }

    return `Departure from ${route.fromTerminal}`;
  };

  return (
    <div
      className={classNames(
        'w-[100%] h-[320px] absolute top-[110%] z-10 flex flex-col transition-all',
        'bg-white border-[1px] pb-1 rounded-lg border-[#E4E7EC] overflow-hidden',
        visible ? 'opacity-[1]' : 'opacity-[0]',
        visible ? 'max-h-[320px]' : 'max-h-[0] pb-0',
      )}
    >
      <div
        className={classNames(
          'flex flex-row items-center p-4 bg-[#F9FAFB]',
          'border-b-[#E4E7EC] border-b-[1px]',
        )}
      >
        {mediums.map((m) => (
          <div
            className={classNames(
              'rounded-1 py-1 px-4 text-[#98A2B3] font-geist text-base font-[400]',
              'transition-all hover:text-[#1D2739] cursor-pointer',
              medium === m && 'bg-white font-[600] text-[#1D2739]',
            )}
            key={m}
            onClick={() => setMedium(m)}
          >
            By {capitaliseText(m)}
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-1 overflow-auto py-2">
        {allRoutes
          ?.filter((r) => r.transportMedium === medium)
          .map((route) => (
            <div
              className={classNames(
                'flex flex-row items-center justify-between',
                'py-2 px-4 cursor-pointer transition-all',
                'hover:bg-[#F9FAFB]',
                selectedRoute?.id === route.id && 'bg-[#F9FAFB]',
              )}
              key={route.id}
              onClick={() => {
                onSelectRoute(route);
                onClose();
              }}
            >
              <div className="flex flex-row items-center gap-2">
                <div className={classNames('font-geist text-sm font-[400] text-[#101928]')}>
                  {route.from} &nbsp; --{'>'}
                </div>
                <div className={classNames('font-geist text-sm font-[400] text-[#101928]')}>
                  {route.to}
                </div>
              </div>
              <div className="flex flex-row items-center gap-[10px]">
                {route.transportMedium === 'air' ? (
                  <TravelMediumIcon.Airplane />
                ) : route.transportMedium === 'bus' ? (
                  <TravelMediumIcon.Bus />
                ) : (
                  <TravelMediumIcon.Train />
                )}

                <div className={classNames('font-geist text-sm font-[400] text-[#667185]')}>
                  {generateDescriptionFromRoute(route)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
