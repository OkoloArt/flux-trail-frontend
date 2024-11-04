'use client';

import { PaginationResponse } from '@/interface/pagination.interface';
import { Ticket } from '@/interface/ticket.interface';
import { useEffect, useState } from 'react';
import { Table } from '@/components/table';
import { ticketTableColumns, ticketTableHeaders } from './table-info';
import { TabToggler } from '@/components/tab-toggler';
import { FiSearch } from 'react-icons/fi';
import classNames from 'classnames';
import { useDebounce } from '@/hooks/use-debounce';
import { useTicketActions } from '@/actions/tickets';
import { useWallet } from '@txnlab/use-wallet';
import { useRecoilValue } from 'recoil';
import { RefreshRoutesAtom } from '@/state/route.atom';

export const Tickets = () => {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('Unused Tickets');
  const { activeAddress } = useWallet();
  const tabs = ['Used Tickets', 'Unused Tickets'];
  const refreshTickets = useRecoilValue(RefreshRoutesAtom);
  const [search, setSearch] = useState('');
  const { getAllTickets } = useTicketActions();
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

  const fetchTickets = async (page: number = 1, currentTab = tab, searchTerm = search) => {
    if (!activeAddress) return;

    setLoading(true);
    const res = await getAllTickets({
      page,
      used: currentTab === 'Used Tickets' ? 'true' : 'false',
      searchTerm,
    });

    setLoading(false);

    if (res) {
      setTickets(res);
    }
  };

  const debouncedSearch = debounce(() => {
    fetchTickets(1, undefined, search);
  });

  useEffect(() => {
    fetchTickets(1, tab);
  }, [tab, activeAddress, refreshTickets]);

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
            <TabToggler tabs={tabs} selectedTab={tab} onSelectTab={setTab} />
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
