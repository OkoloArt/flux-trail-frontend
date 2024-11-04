'use client';

import { useContractActions } from '@/actions/contract-action';
import { useTicketActions } from '@/actions/tickets';
import { BackgroundOverlay } from '@/components/background-overlay';
import { Button } from '@/components/buttons';
import { Ticket } from '@/interface/ticket.interface';
import { RefreshRoutesAtom } from '@/state/route.atom';
import classNames from 'classnames';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';

interface Props {
  data: Ticket;
}

export const DeleteTicket: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const setRefresh = useSetRecoilState(RefreshRoutesAtom);
  const [deleting, setDeleting] = useState(false);
  const { burnTicketAsa } = useContractActions();
  const { burnTicket } = useTicketActions();

  const onBurnTicket = async () => {
    if (deleting) return;

    setDeleting(true);

    try {
      await burnTicketAsa(data.appId, data.assetId);
    } catch (error) {
      toast.error(`${error}`);
      setDeleting(false);
    }

    const res = await burnTicket(data.id);

    setDeleting(false);

    if (res) {
      toast.success('Ticket successfully burned');
      setRefresh((prev) => prev + 1);
      setShowModal(false);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <RiDeleteBin6Line className="text-[#667185] text-[20px]" />
      </div>
      <BackgroundOverlay visible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col w-[544px] bg-white py-[18px] rounded-2xl gap-[33px]">
          <div
            className={classNames(
              'px-6 flex flex-row items-center justify-between pb-4',
              'border-b-[1px] border-b-[#E4E7EC]',
            )}
          >
            <div className="font-geist font-[600] text-[24px] text-[#1D2739]">Burn ticket</div>
            <GrClose
              onClick={() => setShowModal(false)}
              className="text-[#98A2B3] text-[18px] cursor-pointer"
            />
          </div>

          <div className="px-6 flex flex-col gap-[10px]">
            <div className="font-geist text-base text-[#1D2739] font-[400]">
              Are you sure you want to burn this ticket?
            </div>
            <div className="font-geist text-base text-[#1D2739] font-[400]">
              Burning this ticket will permanently remove it from your wallet. Once burned, the
              ticket cannot be restored or used for travel.
            </div>
          </div>

          <div
            className={classNames(
              'flex flex-row items-center justify-end px-6 gap-[10px]',
              'pt-4 border-t-[1px] border-t-[#E4E7EC]',
            )}
          >
            <Button
              size="sm"
              className="w-[80px]"
              variant="error-outlined"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              loading={deleting}
              onClick={onBurnTicket}
              size="sm"
              className="w-[110px]"
              variant="error-solid"
            >
              Burn Ticket
            </Button>
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
};
