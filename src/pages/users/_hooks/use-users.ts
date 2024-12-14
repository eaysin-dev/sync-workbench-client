import { useReadUsersQuery } from "@/features/users/users-api";
import { useDataTableFilters } from "@/hooks/use-data-table-filters";
import usePagination from "@/hooks/use-pagination";

export const useUsers = () => {
  const {
    filters,
    searchQuery,
    isAnyFilterActive,
    updateFilter,
    resetAllFilters,
    resetFilterByKey,
    setSearchQuery,
    setPage,
  } = useDataTableFilters();

  const {
    handlePageChange,
    handlePageSizeChange,
    paginationState,
    currentPage,
    pageSize,
  } = usePagination({});

  const { data, isLoading, isError, error } = useReadUsersQuery({
    limit: pageSize,
    page: currentPage,
    populate: ["role"],
    searchQuery: searchQuery || "",
  });

  const users =
    data?.data?.map((user) => ({
      ...user,
      role: user?.role?.name,
    })) || [];

  return {
    // User data
    users,
    isLoading,
    isError,
    error,
    totalItems: data?.pagination?.total || 0,

    // Filter-related state and actions
    filters,
    searchQuery,
    isAnyFilterActive,
    updateFilter,
    resetAllFilters,
    resetFilterByKey,
    setSearchQuery,

    // Pagination-related state and actions
    paginationState,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    setPage,
  };
};
