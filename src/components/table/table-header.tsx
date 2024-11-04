import { TableHeaderColumn } from '@/interface/table.interface';
import classNames from 'classnames';

interface TableHeaderProps {
  headers: string[] | TableHeaderColumn[];
}

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr className={classNames('h-[45px] bg-[#F9FAFB] border-b-[1px] border-b-[#E4E7EC]')}>
        {headers.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <td
                className={
                  'px-6 py-3 font-geist font-[500] text-[12px] leading-[17px] text-[#344054]'
                }
                key={index}
              >
                {item}
              </td>
            );
          } else {
            return (
              <td
                className={
                  'px-6 py-3 font-geist font-[500] text-[12px] leading-[17px] text-[#344054]'
                }
                key={index}
                style={{ ...item.style }}
              >
                {item.value}
              </td>
            );
          }
        })}
      </tr>
    </thead>
  );
}
