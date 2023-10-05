import { Pagination } from '@mantine/core';
import React, {
  useMemo,
  useState,
} from 'react';

import { PaginationInput } from 'gql';

import { DataPerPageSelect } from '../_components/presenter/DataPerPageSelect';

const PAGINATION_DATA = ['10', '20', '50', '100'];

export const usePageNation = () => {
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(Number(PAGINATION_DATA[0]));
  const [dataCount, setDataCount] = useState(0);

  const paginationData: PaginationInput = useMemo(() => ({
    skip: (page - 1) * dataPerPage,
    take: dataPerPage,
  }), [page, dataPerPage]);

  const newSetDataPerPage = (newDataPerPage: number) => {
    setDataPerPage(newDataPerPage);
    setPage(1);
  };

  const maxPage = Math.max(Math.ceil(dataCount / dataPerPage), 1);

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

  return {
    pagination: <Pagination {...paginationProps} />,
    dataPerPageSelect: <DataPerPageSelect {...dataPerPageSelectProps} />,
    paginationData,
    setDataCount,
    setPage,
  };
};
