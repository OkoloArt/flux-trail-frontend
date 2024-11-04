import { EmptyState } from './empty-state';
import { TableBody } from './table-body';
import { TableExtension } from './table-extension';
import { TableHeader } from './table-header';
import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';

interface TableProps<T> {
  headers: string[] | TableHeaderColumn[];
  columns: TableColumn<T>[];
  data: T[];
  rowClickHandler?: (rowData: T) => void;
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  goTo: (page: number) => void;
  headerContent?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

export function Table<T = any>({
  headers,
  columns,
  data,
  rowClickHandler,
  loading,
  currentPage,
  totalPages,
  goTo,
  headerContent,
  emptyStateDescription,
  emptyStateTitle,
}: TableProps<T>) {
  return (
    <main className="flex flex-col border-[1px] rounded-[10px] border-[#E4E7EC] overflow-hidden">
      {!!headerContent && <div className="flex flex-col p-4 bg-[#FFF]">{headerContent}</div>}

      {data.length === 0 && !loading ? (
        <EmptyState />
      ) : (
        <table>
          <TableHeader headers={headers} />
          <TableBody<T>
            headers={headers}
            columns={columns}
            data={data}
            rowClickHandler={rowClickHandler}
            loading={loading}
          />
        </table>
      )}

      {(loading || data.length > 0) && (
        <TableExtension
          currentPage={currentPage}
          totalPages={totalPages}
          goTo={goTo}
          loading={loading}
        />
      )}
    </main>
  );
}
