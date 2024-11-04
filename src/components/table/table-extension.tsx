import styles from './index.module.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface TableExtensionProps {
  currentPage: number;
  totalPages: number;
  goTo: (page: number) => void;
  loading?: boolean;
}

export const TableExtension = ({ currentPage, totalPages, goTo, loading }: TableExtensionProps) => {
  const renderPageNumbers = () => {
    const pageDivs: ReactNode[] = [];
    const numAhead = totalPages - currentPage + 1;
    const numBehind = totalPages - numAhead;

    if (numAhead < 6 && numBehind > 0) {
      const offset = 6 - numAhead;
      const firstIndexOffset = offset > numBehind ? numBehind : offset;
      const firstIndex = currentPage - firstIndexOffset;

      for (let i = firstIndex; i <= totalPages; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i === currentPage}
            key={i}
            value={i}
            onSelect={() => goTo(i)}
            loading={loading}
          />,
        );
      }
    } else if (numAhead <= 6) {
      for (let i = currentPage; i <= totalPages; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i === currentPage}
            key={i}
            value={i}
            onSelect={() => goTo(i)}
            loading={loading}
          />,
        );
      }
    } else {
      for (let i = 0; i < 3; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i + currentPage === currentPage}
            key={i}
            value={i + currentPage}
            onSelect={() => goTo(i + currentPage)}
            loading={loading}
          />,
        );
      }

      pageDivs.push(
        <PageDiv
          isCurrentPage={false}
          key={3}
          value={'...'}
          onSelect={() => goTo(currentPage + 3)}
          loading={loading}
        />,
      );

      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i === currentPage}
            key={i}
            value={i}
            onSelect={() => goTo(i)}
            loading={loading}
          />,
        );
      }
    }

    return pageDivs;
  };

  return (
    <div className={'flex flex-row items-center justify-between gap-2 p-4 bg-white'}>
      <div className={'font-geist text-sm font-[600] text-[#667185]'}>
        Page {currentPage} of {totalPages}
      </div>

      <div className={'flex flex-row items-center gap-1'}>{renderPageNumbers()}</div>

      <div className="flex flex-row items-center gap-4">
        <div
          className={classNames(
            'flex flex-row items-center gap-[10px] py-2 px-3 hover:bg-[#f0f6ff] min-w-[110px]',
            'rounded-lg border-[1px] border-[#D0D5DD] cursor-pointer transition-all justify-center',
            currentPage <= 1 ? 'opacity-50 hover:bg-[#FFF] cursor-not-allowed' : '',
          )}
          style={{ boxShadow: '0px 4px 8px -2px #00000014' }}
          onClick={() => {
            if (currentPage !== 1) {
              goTo(currentPage - 1);
            }
          }}
        >
          <AiOutlineArrowLeft />
          <span className="font-geist font-[600] text-[#344054] text-sm">Previous</span>
        </div>

        <div
          className={classNames(
            'flex flex-row items-center gap-[10px] py-2 px-3 hover:bg-[#f0f6ff] min-w-[110px]',
            'rounded-lg border-[1px] border-[#D0D5DD] cursor-pointer transition-all justify-center',
            currentPage >= totalPages ? 'opacity-40 hover:bg-[#FFF] cursor-not-allowed' : '',
          )}
          style={{ boxShadow: '0px 4px 8px -2px #00000014' }}
          onClick={() => {
            if (currentPage < totalPages) {
              goTo(currentPage + 1);
            }
          }}
        >
          <span className="font-geist font-[600] text-[#344054] text-sm">Next</span>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

interface PageDivProps {
  isCurrentPage: boolean;
  onSelect: () => any;
  value: number | string;
  loading?: boolean;
}

const PageDiv = ({ isCurrentPage, onSelect, value, loading }: PageDivProps) => {
  return (
    <div
      className={classNames(
        'p-2 rounded-[6px] min-w-6 min-h-6 font-geist font-[400] text-sm text-[#98A2B3] cursor-pointer',
        !loading && 'hover:bg-[#E7F6EC] hover:text-[#0F973D]',
        isCurrentPage ? 'bg-[#E7F6EC] text-[#0F973D]' : '',
        loading ? 'opacity-50 cursor-progress' : '',
      )}
      onClick={() => {
        if (!isCurrentPage && !loading) {
          onSelect();
        }
      }}
    >
      {value}
    </div>
  );
};
