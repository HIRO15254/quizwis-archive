import { Pagination } from '@mantine/core';
import React, {
  useMemo,
  useState,
} from 'react';

import { DataPerPageSelect } from '../_components/presenter/DataPerPageSelect';

const PAGINATION_DATA = ['10', '20', '50', '100'];

interface Props<T> {
  data: T[];
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const usePagination = <T,>(props: Props<T>) => {
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(Number(PAGINATION_DATA[0]));

  const {
    data,
  } = props;

  const maxPage = Math.max(Math.ceil(data.length / dataPerPage), 1);

  const newSetDataPerPage = (newDataPerPage: number) => {
    setDataPerPage(newDataPerPage);
  };

  if (page > maxPage) {
    setPage(maxPage);
  }

  const paginationProps = {
    total: maxPage,
    value: page,
    onChange: setPage,
  };

  const dataPerPageSelectProps = {
    value: dataPerPage,
    onChange: newSetDataPerPage,
    data: PAGINATION_DATA,
  };

  const pageData = useMemo(() => {
    const start = (page - 1) * dataPerPage;
    const end = start + dataPerPage;
    return data.slice(start, end);
  }, [data, page, dataPerPage]);

  return {
    pagination: <Pagination {...paginationProps} />,
    dataPerPageSelect: <DataPerPageSelect {...dataPerPageSelectProps} />,
    pageData,
    setPage,
  };
};
