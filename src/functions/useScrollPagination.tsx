import { MutableRefObject, useEffect, useState } from "react";

export const useScrollPagination = (
  scrollRef: MutableRefObject<null | HTMLDivElement>
) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    setPage(1);
  }, [pageSize]);
  return { page, pageSize, handleScroll, setPage, setPageSize };
};
