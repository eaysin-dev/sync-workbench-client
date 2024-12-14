import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";

interface FiltersProps {
  filters: Record<string, (string | null)[]>;
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
  updateFilter: (key: string, value: string | null) => void;
  resetAllFilters: () => void;
  resetFilterByKey: (key: string) => void;
  isAnyFilterActive: boolean;
  setPage: (value: number | null) => void;
}

const Filters = ({
  filters,
  searchQuery,
  setSearchQuery,
  updateFilter,
  resetAllFilters,
  resetFilterByKey,
  isAnyFilterActive,
  setPage,
}: FiltersProps) => (
  <div className="flex flex-wrap items-center gap-4">
    <DataTableSearch
      searchKey="username"
      searchQuery={searchQuery || ""}
      setSearchQuery={setSearchQuery}
      setPage={setPage}
    />

    <DataTableFilterBox
      filterKey="role"
      title="Role"
      options={[
        { value: "hr", label: "HR" },
        { value: "employee", label: "Employee" },
      ]}
      setFilterValue={(value) => updateFilter("role", value)}
      filterValue={filters?.role || []}
      resetFilterByKey={resetFilterByKey}
    />

    <DataTableFilterBox
      filterKey="status"
      title="Status"
      options={[
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ]}
      setFilterValue={(value) => updateFilter("status", value)}
      filterValue={filters?.status || ""}
      resetFilterByKey={resetFilterByKey}
    />

    <DataTableResetFilter
      isFilterActive={isAnyFilterActive}
      onReset={resetAllFilters}
    />
  </div>
);

export default Filters;
