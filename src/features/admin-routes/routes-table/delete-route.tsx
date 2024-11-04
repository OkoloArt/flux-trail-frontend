'use client';

import { useAdminRouteActions } from '@/actions/admin-routes';
import { useContractActions } from '@/actions/contract-action';
import { BackgroundOverlay } from '@/components/background-overlay';
import { Button } from '@/components/buttons';
import { IRoute } from '@/interface/route.interface';
import { RefreshRoutesAtom } from '@/state/route.atom';
import classNames from 'classnames';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';

interface Props {
  data: IRoute;
}

export const DeleteRoute: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const setRefreshRoutes = useSetRecoilState(RefreshRoutesAtom);
  const { deleteRoute } = useAdminRouteActions();
  const { deleteRouteContract } = useContractActions();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);

    try {
      toast.loading('Deleting route smart contract...');
      await deleteRouteContract(data.appId);
      toast.dismiss();
      toast.success('Route smart contract deleted successfully');
    } catch (error) {
      toast.error(`Failed to delete route: ${error}`);
      setLoading(false);
      return;
    }

    toast.loading('Deleting route...');
    const response = await deleteRoute(data.id);
    setLoading(false);
    toast.dismiss();

    if (response) {
      toast.success('Route deleted successfully');
      setRefreshRoutes((prev) => prev + 1);
      setShowModal(false);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => {
          if (loading) return;
          setShowModal(true);
        }}
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
            <div className="font-geist font-[600] text-[24px] text-[#1D2739]">Delete route</div>
            <GrClose
              onClick={() => setShowModal(false)}
              className="text-[#98A2B3] text-[18px] cursor-pointer"
            />
          </div>

          <div className="px-6 flex flex-col gap-[10px]">
            <div className="font-geist text-base text-[#1D2739] font-[400]">
              Are you sure you want to delete this route?
            </div>
            <div className="font-geist text-base text-[#1D2739] font-[400]">
              Deleting this route will permanently remove it from the catalog.
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
              size="sm"
              className="w-[110px]"
              variant="error-solid"
              loading={loading}
              onClick={handleDelete}
            >
              Delete Route
            </Button>
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
};
