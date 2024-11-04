'use client';

import { FluxTrailLogo } from '@/assets/flux-trail-logo.icon';
import { LineIcon } from '@/assets/line.icon';
import { TravelMediumIcon } from '@/assets/travel-medium.icon';
import { Button } from '@/components/buttons';
import { SideModal } from '@/components/side-modal';
import { Ticket } from '@/interface/ticket.interface';
import { capitaliseText } from '@/utils/capitalise-text';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { MdArrowRightAlt } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  data: Ticket;
}

export const TicketDetails: React.FC<Props> = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { push } = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const downloadQrCode = async () => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, { scale: 2 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${data.from}-to-${data.to}-#${data.assetId}-qr-code.png`;
    link.click();
  };

  return (
    <>
      <div
        onClick={() => setShowDetails(true)}
        className="cursor-pointer font-geist font-[500] text-sm text-[#344054] text-center"
      >
        View
      </div>
      <SideModal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <div className="flex flex-col py-12 gap-10">
          <div className="text-base font-geist font-[400] text-[#645D5D]">Ticket details</div>
          <div className="flex flex-col gap-6">
            <div
              style={{
                boxShadow: '0px 5px 13px -5px #1019280D',
              }}
              className={classNames(
                'rounded-lg py-6 px-[10px] flex flex-col gap-6',
                'border-[1px] border-[#F0F2F5]',
              )}
            >
              <div className="flex flex-row gap-[6px] items-center">
                <FluxTrailLogo className="w-[28.5px] h-[33px]" />
                <div className="font-satoshi font-[700] text-[24px] leading-8 text-[#344054]">
                  FluxTrail
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="font-geist text-base font-[400] text-[#667185]">{data.from}</div>
                  <div className="font-geist text-base font-[400] text-[#667185]">{data.to}</div>
                </div>
                <div className="flex flex-row items-center justify-between gap-1  flex-wrap">
                  <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
                    {data.fromStateCode}
                  </div>
                  <div className="flex flex-row gap-3 items-center max-w-[280px]">
                    <LineIcon.Forward className="w-[80px]" />
                    {data?.transportMedium === 'air' && <TravelMediumIcon.Airplane />}
                    {data?.transportMedium === 'bus' && <TravelMediumIcon.Bus />}
                    {data?.transportMedium === 'train' && <TravelMediumIcon.Train />}
                    <LineIcon.Backward className="w-[80px]" />
                  </div>
                  <div className="font-geist text-[40px] leading-[58px] font-[600] text-[#101928]">
                    {data.toStateCode}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="font-geist text-base font-[400] text-[#667185]">
                    {data.fromTerminal}
                  </div>
                  <div className="font-geist text-base font-[400] text-[#667185]">
                    {data.fromTerminal}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="font-geist text-base font-[400] text-[#667185]">---</div>
                  <div className="font-geist text-base font-[400] text-[#667185]">---</div>
                </div>
              </div>
              <div
                className={classNames(
                  'flex flex-col pt-3 border-t-[1px]',
                  'border-t-[#F0F2F5] gap-0',
                )}
              >
                <div className="flex flex-row justify-between gap-2 py-3">
                  <div className="font-geist text-base font-[400] text-[#667185]">ASA ID</div>
                  <div className="font-geist text-base font-[400] text-[#101928]">
                    #{data.assetId}
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-2 py-3">
                  <div className="font-geist text-base font-[400] text-[#667185]">Ticket type</div>
                  <div className="font-geist text-base font-[400] text-[#101928]">
                    {`${
                      data.transportMedium === 'air'
                        ? 'Plane'
                        : capitaliseText(data.transportMedium)
                    } ticket`}
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-2 py-3">
                  <div className="font-geist text-base font-[400] text-[#667185]">
                    Number of passengers
                  </div>
                  <div className="font-geist text-base font-[400] text-[#101928]">
                    {`${data.numberOfAdults} Adult${data.numberOfAdults === 1 ? '' : 's'}, ${
                      data.numberOfChildren
                    } Child${data.numberOfChildren === 1 ? '' : 'ren'}, ${
                      data.numberOfInfants
                    } Infant${data.numberOfInfants === 1 ? '' : 's'}`}
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  'flex items-center justify-center pt-3 relative',
                  'border-t-[1px] border-t-[#D0D5DD] border-dashed',
                )}
              >
                <div className="flex justify-center items-center relative p-4" ref={ref}>
                  <QRCode value={`${window.location.origin}/ticket-history/${data.assetId}`} />
                  <FluxTrailLogo className="absolute w-8 h-8" />
                </div>
                <div
                  className={classNames(
                    'absolute w-6 h-6 rounded-3xl bg-[#FFF]',
                    'top-[-12px] left-[-22px]',
                    'border-r-[1px] border-r-[#D9D9D9]',
                  )}
                />
                <div
                  className={classNames(
                    'absolute w-6 h-6 rounded-3xl bg-[#FFF]',
                    'top-[-12px] right-[-22px]',
                    'border-l-[1px] border-l-[#D9D9D9]',
                  )}
                />
              </div>
            </div>
            <Button onClick={downloadQrCode} variant="outlined">
              <FiDownload />
              <span>Download QR Code</span>
            </Button>
            <Link
              className={classNames(
                'flex flex-row items-center rounded-lg justify-center',
                'p-4 gap-[10px] border-[1.5px] border-[#FFF] cursor-pointer',
                'hover:border-[#0DAC5C] transition-all',
              )}
              href={`/ticket-history/${data.assetId}`}
              target="_blank"
            >
              <MdArrowRightAlt className="text-[#0DAC5C] " />
              <span className={classNames('font-geist font-[600] text-base text-[#0DAC5C]')}>
                Open ticket url
              </span>
            </Link>
          </div>
        </div>
      </SideModal>
    </>
  );
};
