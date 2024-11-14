import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CATEGORY_OPTIONS = [
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Clothing", label: "Clothing" },
  { value: "Toys", label: "Toys" },
  { value: "Groceries", label: "Groceries" },
  { value: "Books", label: "Books" },
  { value: "Jewelry", label: "Jewelry" },
  { value: "Beauty Products", label: "Beauty Products" },
];

export function useProductTableFilters() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  // Manage search query state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Manage category filter state
  const [categoriesFilter, setCategoriesFilter] = useState(
    searchParams.get("categories") || ""
  );

  // Manage page state
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Effect to update the URL whenever state changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (searchQuery) {
      newSearchParams.set("q", searchQuery);
    }

    if (categoriesFilter) {
      newSearchParams.set("categories", categoriesFilter);
    }

    newSearchParams.set("page", String(page));

    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    });
  }, [searchQuery, categoriesFilter, page, navigate, location.pathname]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setCategoriesFilter("");
    setPage(1);
  }, []);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter;
  }, [searchQuery, categoriesFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter,
  };
}
