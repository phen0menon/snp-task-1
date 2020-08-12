import { useCallback, useMemo, useState } from 'react';

export default (initialPagesCount, initialPage = 0) => {
  const [page, setPage] = useState(initialPage);
  const [pagesCount, setPagesCount] = useState(initialPagesCount);

  const isFirstPage = useMemo(() => page === 0, [page]);

  const isLastPage = useMemo(() => page === pagesCount - 1, [page, pagesCount]);

  const gotoNextPage = useCallback(() => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  }, [isLastPage, setPage, page]);

  const gotoPreviousPage = useCallback(() => {
    if (!isFirstPage) {
      setPage(page - 1);
    }
  }, [isFirstPage, setPage, page]);

  return {
    page,
    gotoNextPage,
    gotoPreviousPage,
    isFirstPage,
    isLastPage,
    setPagesCount,
  };
};
