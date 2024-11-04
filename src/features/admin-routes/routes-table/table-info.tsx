import { AlgorandIcon } from '@/assets';
import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';
import classNames from 'classnames';
import { DeleteRoute } from './delete-route';
import { IRoute } from '@/interface/route.interface';

export const routesTableHeaders: TableHeaderColumn[] = [
  {
    value: 'App ID',
    style: { width: '150px' },
  },
  {
    value: 'Date created',
    style: { width: '239px' },
  },
  {
    value: 'Travel Route',
    style: { width: '302px' },
  },
  {
    value: 'Transport',
    style: { width: '150px' },
  },
  {
    value: 'Price',
    style: { width: '226px', textAlign: 'center' },
  },
  {
    value: '',
    style: { width: '80px' },
  },
];

export const routesTableColumns: TableColumn<IRoute>[] = [
  {
    key: '',
    render: (_, data) => {
      return <div className="font-geist text-sm text-[#667185] font-[600]">{data.appId}</div>;
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-geist text-sm text-[#667185]">
          {new Date(data.createdAt).toDateString()}
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-geist font-[600] text-base text-[#344054]">
          {`${data.from} ---> ${data.to}`}
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div
          className={classNames(
            'px-3 py-[2px] rounded-xl font-geist font-[500] text-sm w-[fit-content]',
            'capitalize',
            data.transportMedium === 'air' && 'text-[#04326B] bg-[#E3EFFC]',
            data.transportMedium === 'bus' && 'text-[#344054] bg-[#F0F2F5]',
            data.transportMedium === 'train' && 'text-[#036B26] bg-[#E7F6EC]',
          )}
        >
          By {data.transportMedium}
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className={classNames('flex flex-row items-center gap-2 justify-center')}>
          <AlgorandIcon className="w-4 h-4" />
          <div className="font-geist font-[500] text-sm text-[#344054]">{data.price}</div>
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return <DeleteRoute data={data} />;
    },
  },
];
