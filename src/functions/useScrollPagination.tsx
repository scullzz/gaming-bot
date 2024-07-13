import { useEffect, useState } from "react";

export const useScrollPagination = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    setPage(1);
  }, [pageSize]);
  return { page, pageSize, handleScroll, setPage, setPageSize };
};
