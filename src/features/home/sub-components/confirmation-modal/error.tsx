import { WarningIcon } from '@/assets/warning.icon';
import { Button } from '@/components/buttons';

interface Props {
  onReturn: () => void;
}

export const ErrorView = ({ onReturn }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <WarningIcon />
      <div className="flex flex-col gap-2">
        <div className="font-geist text-[24px] leading-[29px] text-[#101928] font-[500] text-center">
          Payment failed!
        </div>
        <div className="font-geist text-[24px] leading-[29px] text-[#667185] font-[500] text-center">
          Insufficient Algos in your wallet. Please, add funds
        </div>
      </div>
      <Button onClick={onReturn} size="l" className="w-[100%] mt-5">
        Return
      </Button>
    </div>
  );
};
