import { useCallback, useEffect, useMemo, useState } from "react";

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface SearchParams {
  q: string;
  gender: string;
  page: number;
}

interface UseEmployeeTableFilters {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  genderFilter: string;
  setGenderFilter: (gender: string) => void;
  page: number;
  setPage: (page: number) => void;
  resetFilters: () => void;
  isAnyFilterActive: boolean;
}

// Default values to avoid 'undefined' errors
const defaultSearchParams: SearchParams = {
  q: "",
  gender: "",
  page: 1,
};

export function useEmployeeTableFilters(
  searchParams: SearchParams = defaultSearchParams // Default to the fallback values if not passed
): UseEmployeeTableFilters {
  // State hooks for search, gender filter, and pagination
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.q || "");
  const [genderFilter, setGenderFilter] = useState<string>(
    searchParams.gender || ""
  );
  const [page, setPage] = useState<number>(searchParams.page || 1);

  // Throttling the searchQuery (delayed search)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Handle delayed search logic (e.g., API calls or filtering data)
    }, 1000);

    return () => {
      clearTimeout(timeoutId); // Cleanup timeout on re-render
    };
  }, [searchQuery]);

  // Function to reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setGenderFilter("");
    setPage(1);
  }, []);

  // Memoize if any filter is active
  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!genderFilter || page !== 1;
  }, [searchQuery, genderFilter, page]);

  // Return the hook's values
  return {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
