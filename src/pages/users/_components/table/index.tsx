import Pagination from "@/components/pagination";
import { DataTableDemo } from "@/components/ui/table/data-table1";
import { useReadUsersQuery } from "@/features/users/users-api";
import usePagination from "@/hooks/use-pagination";
import { useUserTableFilters } from "../../_hooks/use-user-table-filters";
import { columns, UserTableRow } from "./columns";
import Filters from "./filters";

export default function UsersTable() {
  const {
    filters,
    searchQuery,
    isAnyFilterActive,
    updateFilter,
    resetFilters,
    setSearchQuery,
    setPage,
    sortBy,
    sortType,
  } = useUserTableFilters();

  const {
    handlePageChange,
    handlePageSizeChange,
    pageCount,
    paginationState,
    currentPage,
    pageSize,
  } = usePagination({ totalItems: 4 });

  const { data } = useReadUsersQuery({
    limit: pageSize,
    page: currentPage,
    populate: ["role"],
    search: searchQuery || "",
    sortBy: sortBy || "",
    sortType: sortType || "asc",
  });

  const users: UserTableRow[] =
    data?.data?.map((user) => ({
      ...user,
      role: user?.role?.name,
    })) || [];

  console.log({ filters });

  return (
    <div className="space-y-4">
      <Filters
        filters={filters}
        isAnyFilterActive={isAnyFilterActive}
        resetFilters={resetFilters}
        searchQuery={searchQuery}
        setPage={setPage}
        setSearchQuery={setSearchQuery}
        updateFilter={updateFilter}
      />

      <DataTableDemo columns={columns} data={users} />

      <Pagination
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        pageCount={pageCount}
        paginationState={paginationState}
        totalItems={users?.length || 0}
      />
    </div>
  );
}
