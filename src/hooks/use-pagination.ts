import defaultConfig from "@/config/default";
import { useState } from "react";

const usePagination = ({
  totalItems,
  pageSizeOptions = defaultConfig.pageSizeOptions,
}: {
  totalItems: number;
  pageSizeOptions?: number[];
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const paginationState = {
    pageIndex: currentPage - 1,
    pageSize: pageSize,
  };

  const pageCount = Math.ceil(totalItems / pageSize);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex + 1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return {
    handlePageChange,
    handlePageSizeChange,
    pageCount,
    paginationState,
    currentPage,
    pageSize,
  };
};

export default usePagination;
