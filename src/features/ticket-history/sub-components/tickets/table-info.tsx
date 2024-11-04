import { AlgorandIcon } from '@/assets';
import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';
import { Ticket } from '@/interface/ticket.interface';
import classNames from 'classnames';
import { TicketDetails } from './ticket-details';
import { DeleteTicket } from './delete-ticket';

export const ticketTableHeaders: TableHeaderColumn[] = [
  {
    value: 'ASA ID',
    style: { width: '133px' },
  },
  {
    value: 'Date',
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
    style: { width: '88px' },
  },
  {
    value: '',
    style: { width: '80px' },
  },
];

export const ticketTableColumns: TableColumn<Ticket>[] = [
  {
    key: '',
    render: (_, data) => {
      return <div className="font-geist text-sm text-[#667185]">#{data.assetId}</div>;
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
          <div className="font-geist font-[500] text-sm text-[#344054]">
            {data.price * (data.numberOfAdults + data.numberOfChildren + data.numberOfInfants)}
          </div>
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return <TicketDetails data={data} />;
    },
  },
  {
    key: '',
    render: (_, data) => {
      return data.used ? <DeleteTicket data={data} /> : <></>;
    },
  },
];
