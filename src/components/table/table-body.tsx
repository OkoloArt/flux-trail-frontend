import Skeleton from 'react-loading-skeleton';
import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';

interface TableBodyProps<T> {
  columns: TableColumn[];
  data: any[];
  rowClickHandler?: (rowData: T) => void;
  headers: string[] | TableHeaderColumn[];
  loading?: boolean;
}

export function TableBody<T = any>({
  columns,
  data,
  rowClickHandler = () => null,
  headers,
  loading,
}: TableBodyProps<T>) {
  return (
    <tbody>
      {!loading &&
        data.map((row, index) => (
          <tr
            className={'border-b-[1px] border-b-[#E4E7EC] h-[72px] bg-[#FFF]'}
            key={index}
            onClick={() => rowClickHandler(row)}
          >
            {columns.map((column, index) => (
              <td
                key={index}
                className="px-6 py-4 text-[#667185] font-geist font-[400] text-[14px] leading-[20px]"
                data-label={headers[index]}
                style={{ ...column.style }}
              >
                {column.render(row[column.key], row, index)}
              </td>
            ))}
          </tr>
        ))}
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <tr className={'border-b-[1px] border-b-[#E4E7EC] h-[72px] bg-[#FFF]'} key={index}>
            {columns.map((column, index) => (
              <td
                key={index}
                className="px-6 py-4 text-[#667185] font-geist font-[400] text-[14px] leading-[20px]"
                data-label={headers[index]}
                style={{ ...column.style }}
              >
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
}
