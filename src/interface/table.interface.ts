import { CSSProperties } from 'react';

export interface TableColumn<T = any> {
  key: string;
  render: (cell: any, rowData: T, index?: number) => JSX.Element | string | number;
  style?: CSSProperties;
}

export interface TableHeaderColumn {
  value: string;
  style?: CSSProperties;
}
