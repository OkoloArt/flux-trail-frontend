'use client';

import { CarIcon } from '@/assets/car.icon';
import { FluxTrailLogo } from '@/assets/flux-trail-logo.icon';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

export const DescriptionSection = () => {
  const [animateCars, setAnimateCars] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimateCars(false);
    }, 0);
  }, []);

  return (
    <div
      className={classNames(
        'flex flex-col flex-1 min-w-[700px] relative gap-[80px]',
        'rounded-[30px] bg-[#1B1818] pt-[60px] pb-[200px]',
        'overflow-hidden',
      )}
      style={{ height: 'calc(100vh - 40px)', maxHeight: '984px' }}
    >
      <div className={classNames('flex flex-row gap-2 items-center px-[60px]')}>
        <FluxTrailLogo className="w-[38px] h-[44px]" />
        <div className="font-satoshi font-[700] text-[32px] leading-[43.2px] text-[#FFFFFF]">
          FluxTrail
        </div>
      </div>
      <div className="flex flex-col gap-8 px-[60px]">
        <div className="font-geist text-[60px] leading-[66px] text-[#FFF] font-[600]">
          Create fast and <span className="text-[#0DAC5C]">smart</span> travel routes on the
          blockchain
        </div>
        <div className="max-w-[420px] font-geist font-[400] text-[#D0D5DD] text-[18px] leading-[26px]">
          Easily create, edit, or delete routes in real time, ensuring your users always have access
          to the most efficient travel options.
        </div>
      </div>

      <div
        className={classNames(
          'absolute w-[2365px] h-[2365px] rounded-[100%] border-[12px]',
          'top-[602px] left-[-699px] border-[#FFF] bg-[#06DD71]',
        )}
        style={{ transition: 'all 9s', transform: `rotate(${animateCars ? 60 : -20}deg)` }}
      >
        <CarIcon.Taxi
          style={{ transform: 'rotate(204deg) scale(0.75)' }}
          className={classNames('absolute top-[95px] left-[1600px]')}
        />
        <CarIcon.Truck
          style={{ transform: 'rotate(192deg) scale(0.75)' }}
          className={classNames('absolute top-[13px] left-[1350px]')}
        />
        <CarIcon.Truck
          style={{ transform: 'rotate(180deg) scale(0.75)' }}
          className={classNames('absolute top-[-12px] left-[1150px]')}
        />
        <CarIcon.Saloon
          style={{ transform: 'rotate(172deg) scale(0.75)' }}
          className={classNames('absolute top-[1px] left-[950px]')}
        />
        <CarIcon.Taxi
          style={{ transform: 'rotate(162deg) scale(0.75)' }}
          className={classNames('absolute top-[50px] left-[750px]')}
        />
        <CarIcon.Saloon
          style={{ transform: 'rotate(152deg) scale(0.75)' }}
          className={classNames('absolute top-[140px] left-[550px]')}
        />
      </div>

      <div
        className={classNames(
          'absolute w-[2154px] h-[2154px] rounded-[100%] border-[12px]',
          'top-[707.5px] left-[-593.5px] border-[#FFF] bg-[#1B1818]',
        )}
        style={{ transition: 'all 8s', transform: `rotate(${animateCars ? -60 : 20}deg)` }}
      >
        <CarIcon.Taxi
          style={{ transform: 'rotate(18deg) scale(0.75)' }}
          className={classNames('absolute top-[-8px] left-[1350px]')}
        />
        <CarIcon.Taxi
          style={{ transform: 'rotate(8deg) scale(0.75)' }}
          className={classNames('absolute top-[-50px] left-[1150px]')}
        />
        <CarIcon.Saloon
          style={{ transform: 'rotate(-4deg) scale(0.75)' }}
          className={classNames('absolute top-[-62px] left-[950px]')}
        />
        <CarIcon.Truck
          style={{ transform: 'rotate(-15deg) scale(0.75)' }}
          className={classNames('absolute top-[-30px] left-[750px]')}
        />
        <CarIcon.Taxi
          style={{ transform: 'rotate(-25deg) scale(0.75)' }}
          className={classNames('absolute top-[39px] left-[550px]')}
        />
        <CarIcon.Saloon
          style={{ transform: 'rotate(-38deg) scale(0.75)' }}
          className={classNames('absolute top-[166px] left-[350px]')}
        />
      </div>

      {/**
       * Middle dash
       */}
      <div
        className={classNames(
          'absolute w-[2259.44px] h-[2259.44px] rounded-[100%] border-[12px]',
          'top-[654.78px] left-[-646.22px] border-[#FFF] border-dashed',
        )}
      ></div>
    </div>
  );
};
