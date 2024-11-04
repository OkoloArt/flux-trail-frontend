'use client';

import { PaginationResponse } from '@/interface/pagination.interface';
import { useEffect, useState } from 'react';
import { Table } from '@/components/table';
import { FiSearch } from 'react-icons/fi';
import classNames from 'classnames';
import { routesTableColumns, routesTableHeaders } from './table-info';
import { useDebounce } from '@/hooks/use-debounce';
import { IRoute } from '@/interface/route.interface';
import { useAdminRouteActions } from '@/actions/admin-routes';
import { useRecoilValue } from 'recoil';
import { RefreshRoutesAtom } from '@/state/route.atom';

export const RoutesTable = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { debounce } = useDebounce();
  const { getAllRoutes } = useAdminRouteActions();
  const refresh = useRecoilValue(RefreshRoutesAtom);
  const [routes, setRoutes] = useState<PaginationResponse<IRoute>>({
    data: [],
    pagination: {
      page: 1,
      numOfItemsPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false,
      itemCount: 0,
      pageCount: 0,
    },
  });

  const fetchRoutes = async (page: number = 1, searchTerm = search) => {
    setLoading(true);
    const data = await getAllRoutes({
      page,
      searchTerm: searchTerm,
    });

    if (data) {
      setRoutes(data);
    }

    setLoading(false);
  };

  const debouncedSearch = debounce(() => {
    fetchRoutes(1, search);
  });

  useEffect(() => {
    fetchRoutes(1);
  }, [refresh]);

  useEffect(() => {
    debouncedSearch();
  }, [search]);

  return (
    <>
      <Table<IRoute>
        headers={routesTableHeaders}
        columns={routesTableColumns}
        data={routes.data}
        loading={loading}
        currentPage={routes.pagination.page}
        totalPages={routes.pagination.pageCount}
        goTo={(page) => fetchRoutes(page, search)}
        headerContent={
          <div className="flex flex-row justify-between items-center">
            <div
              className={classNames(
                'font-geist font-[500] text-[24px]',
                'leading-[28px] text-[#344054]',
              )}
            >
              All routes
            </div>
            <div
              className={classNames(
                'flex flex-row items-center gap-2 w-[291px]',
                'rounded-[6px] border-[1px] border-[#D0D5DD] px-3 py-2',
              )}
              style={{ boxShadow: '0px 2px 4px -2px #0000000A' }}
            >
              <FiSearch className="text-[#667185]" />
              <input
                className="flex-1 outline-0 font-geist text-sm text-[#667185]"
                type="text"
                placeholder="Search here..."
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              />
            </div>
          </div>
        }
      />
    </>
  );
};
