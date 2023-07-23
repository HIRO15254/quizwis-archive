import {
  useCallback, useEffect, useState,
} from 'react';

type UsePageNationProps = {
  onChangePage: (page: number, dataPerPage?: number) => void;
  defaultDataPerPage?: number;
  dataCount: number;
};

export const usePageNation = (props: UsePageNationProps) => {
  const { onChangePage, dataCount, defaultDataPerPage } = props;
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(defaultDataPerPage ?? 10);

  const newSetPage = useCallback((newPage: number) => {
    setPage(newPage);
    onChangePage(newPage);
  }, [onChangePage]);

  const newSetDataPerPage = (newDataPerPage: number) => {
    setDataPerPage(newDataPerPage);
    setPage(1);
    onChangePage(1, newDataPerPage);
  };

  const maxPage = Math.max(Math.ceil(dataCount / dataPerPage), 1);

  useEffect(() => {
    if (page > maxPage) {
      newSetPage(maxPage);
    }
  }, [dataCount, dataPerPage, maxPage, page, newSetPage]);

  return {
    paginationProps: {
      total: page,
      value: maxPage,
      onChange: newSetPage,
    },
    dataPerPage,
    setDataPerPage: newSetDataPerPage,
    page,
  };
};
