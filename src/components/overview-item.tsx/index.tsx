import { MiscIcon } from '@/assets/misc.icon';
import classNames from 'classnames';

interface Props {
  title: string;
  value: React.ReactNode;
}

export const OverviewItem = (props: Props) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-8 bg-white flex-1 rounded-[12px]',
        'border-[1px] border-[#E4E7EC] p-4',
      )}
      style={{ boxShadow: '0px 5px 3px -2px #00000005' }}
    >
      <div className="flex flex-row items-center gap-3">
        <MiscIcon />
        <div className="font-geist font-[500] text-sm text-[#667185]">{props.title}</div>
      </div>
      <div className="font-geist font-[600] text-[32px] leading-[38.4px] text-[#1D2739]">
        {props.value}
      </div>
    </div>
  );
};
