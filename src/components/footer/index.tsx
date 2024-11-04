import { FluxTrailLogo } from '@/assets/flux-trail-logo.icon';

export const Footer = () => {
  return (
    <footer className="bg-white flex flex-row justify-between items-center gap-4 px-20 py-8 border-t-[1px] border-t-[#D0D5DD]">
      <div className="text-[#98A2B3] font-[400] text-base font-geist">
        Copyright 2024 - All rights reserved
      </div>
      <div className="flex flex-row items-center gap-[6px]">
        <FluxTrailLogo className="w-[28.5px] h-[33px]" />
        <span className="font-satoshi text-2xl font-[700] text-[#344054]">FluxTrail</span>
      </div>
    </footer>
  );
};
