'use client';

import { PaginationResponse } from '@/interface/pagination.interface';
import { Ticket } from '@/interface/ticket.interface';
import { useEffect, useState } from 'react';
import { Table } from '@/components/table';
import { ticketTableColumns, ticketTableHeaders } from './table-info';
import { FiSearch } from 'react-icons/fi';
import classNames from 'classnames';
import { useDebounce } from '@/hooks/use-debounce';
import { useAdminRouteActions } from '@/actions/admin-routes';

export const TicketsTable = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { getAllTickets } = useAdminRouteActions();
  const { debounce } = useDebounce();
  const [tickets, setTickets] = useState<PaginationResponse<Ticket>>({
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

  const fetchTickets = async (page: number = 1, searchTerm = search) => {
    setLoading(true);

    const response = await getAllTickets({ page, searchTerm });

    if (response) {
      setTickets(response);
    }

    setLoading(false);
  };

  const debouncedSearch = debounce(() => {
    fetchTickets(1, search);
  });

  useEffect(() => {
    fetchTickets(1);
  }, []);

  useEffect(() => {
    debouncedSearch();
  }, [search]);

  return (
    <>
      <Table<Ticket>
        headers={ticketTableHeaders}
        columns={ticketTableColumns}
        data={tickets.data}
        loading={loading}
        currentPage={tickets.pagination.page}
        totalPages={tickets.pagination.pageCount}
        goTo={fetchTickets}
        headerContent={
          <div className="flex flex-row justify-between items-center">
            <div
              className={classNames(
                'font-geist font-[500] text-[24px]',
                'leading-[28px] text-[#344054]',
              )}
            >
              All tickets
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
