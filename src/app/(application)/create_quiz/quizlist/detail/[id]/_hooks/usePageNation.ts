import {
  useCallback, useEffect, useState,
} from 'react';

type UsePageNationProps = {
  onChangePage: (page: number, dataPerPage?: number) => void;
  defaultDataPerPage?: number;
};

export const usePageNation = (props: UsePageNationProps) => {
  const { onChangePage, defaultDataPerPage } = props;
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(defaultDataPerPage ?? 10);
  const [dataCount, setDataCount] = useState(0);

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
      total: maxPage,
      value: page,
      onChange: newSetPage,
    },
    setDataCount,
    dataPerPage,
    setDataPerPage: newSetDataPerPage,
    page,
  };
};
