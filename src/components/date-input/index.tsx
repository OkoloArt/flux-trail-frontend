'use client';

import classNames from 'classnames';
import { useState } from 'react';

interface Props {
  label?: string;
  date?: string;
  onChange?: (date: string) => void;
}

export const DateInput = ({ label = 'Select date', date, onChange }: Props) => {
  return (
    <div className="flex flex-col relative gap-1">
      <div className="font-geist text-sm font-[500] text-[#101928]">{label}</div>
      <div className="flex flex-row justify-between items-center rounded-[6px] border-[1px] border-[#D0D5DD] bg-white py-[18px] px-4 cursor-pointer">
        <input
          className={classNames(
            'font-[400] text-sm font-geist',
            'flex-1 cursor-pointer outline-none',
            date ? 'text-[#101928]' : 'text-[#98A2B3]',
          )}
          type="date"
          placeholder={label}
          value={date}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
};
