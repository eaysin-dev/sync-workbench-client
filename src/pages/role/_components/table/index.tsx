import Pagination from "@/components/pagination";
import { DataTable } from "@/components/ui/table/data-table";
import { useReadRolesQuery } from "@/features/role/role-api";
import usePagination from "@/hooks/use-pagination";
import { useTableFilter } from "../../../../hooks/use-table-filters";
import { columns } from "./columns";
import Filters from "./filters";

export default function RolesTable() {
  const {
    searchQuery,
    isAnyFilterActive,
    resetFilters,
    setSearchQuery,
    setPage,
    handleSortChange,
    sortBy,
    sortType,
  } = useTableFilter();

  const {
    handlePageChange,
    handlePageSizeChange,
    pageCount,
    paginationState,
    currentPage,
    pageSize,
  } = usePagination({ totalItems: 4 });

  const { data: roles } = useReadRolesQuery({
    limit: pageSize,
    page: currentPage,
    populate: ["role"],
    search: searchQuery || "",
    sortBy: sortBy || "",
    sortType: sortType || "asc",
  });

  return (
    <div className="space-y-4">
      <Filters
        isAnyFilterActive={isAnyFilterActive}
        resetFilters={resetFilters}
        searchQuery={searchQuery}
        setPage={setPage}
        setSearchQuery={setSearchQuery}
      />

      <DataTable
        columns={columns}
        data={roles?.data || []}
        handlePageChange={handlePageChange}
        pageCount={pageCount}
        paginationState={paginationState}
        onSortChange={handleSortChange}
        sortType={sortType}
        sortBy={sortBy}
      />

      <Pagination
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        pageCount={pageCount}
        paginationState={paginationState}
        totalItems={roles?.data?.length || 0}
      />
    </div>
  );
}
