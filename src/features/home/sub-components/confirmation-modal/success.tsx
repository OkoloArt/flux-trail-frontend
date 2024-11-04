import { AlgorandIcon } from '@/assets';
import { QrCodeIcon } from '@/assets/qr-code.icon';
import { SuccessIcon } from '@/assets/success.icon';
import { Ticket } from '@/interface/ticket.interface';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { FiDownload } from 'react-icons/fi';
import { MdArrowRightAlt } from 'react-icons/md';
import QRCode from 'react-qr-code';

interface Props {
  onClose: () => void;
  data: Ticket;
}

export const SuccessView = ({ onClose, data }: Props) => {
  const { push } = useRouter();
  const price = (data.numberOfInfants + data.numberOfAdults + data.numberOfChildren) * data.price;

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
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <SuccessIcon />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-3 items-center">
          <div className="font-geist font-[500] text-[24px] leading-[30px] text-[#667185]">
            Payment successful
          </div>
          <div className="flex flex-row items-center gap-2">
            <AlgorandIcon className="w-10 h-10" />
            <div className="font-geist font-[600] text-[40px] leading-[58px] text-[#1D2739]">
              {price}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="p-4" ref={ref}>
            <QRCode value={`${window.location.origin}/ticket-history/${data.assetId}`} />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div
              className={classNames(
                'flex flex-row items-center w-[302px] rounded-lg justify-center',
                'p-4 gap-[10px] border-[1.5px] border-[#0DAC5C] cursor-pointer',
                'group hover:bg-[#0DAC5C] transition-all',
              )}
              onClick={downloadQrCode}
            >
              <FiDownload className="text-[#0DAC5C] group-hover:text-[#FFF] transition-all" />
              <span
                className={classNames(
                  'font-geist font-[600] text-base text-[#0DAC5C]',
                  'group-hover:text-[#FFF] transition-all',
                )}
              >
                Download QR Code
              </span>
            </div>
            <div
              className={classNames(
                'flex flex-row items-center w-[302px] rounded-lg justify-center',
                'p-4 gap-[10px] border-[1.5px] border-[#FFF] cursor-pointer',
                'hover:border-[#0DAC5C] transition-all',
              )}
              onClick={() => {
                onClose();
                push(`/ticket-history/${data.assetId}`);
              }}
            >
              <MdArrowRightAlt className="text-[#0DAC5C] " />
              <span className={classNames('font-geist font-[600] text-base text-[#0DAC5C]')}>
                View Ticket Details
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
