import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";

interface FiltersProps {
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
  resetFilters: () => void;
  isAnyFilterActive: boolean;
  setPage: (value: number | null) => void;
}

const Filters = ({
  searchQuery,
  setSearchQuery,
  resetFilters,
  isAnyFilterActive,
  setPage,
}: FiltersProps) => (
  <div className="flex flex-wrap items-center gap-4">
    <DataTableSearch
      searchKey="name"
      searchQuery={searchQuery || ""}
      setSearchQuery={setSearchQuery}
      setPage={setPage}
    />

    <DataTableResetFilter
      isFilterActive={isAnyFilterActive}
      onReset={resetFilters}
    />
  </div>
);

export default Filters;
