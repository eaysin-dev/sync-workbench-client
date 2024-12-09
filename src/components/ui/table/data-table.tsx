import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  paginationState: {
    pageIndex: number;
    pageSize: number;
  };
  handlePageChange: (pageIndex: number) => void;
  sortBy?: string | null;
  sortType?: "asc" | "desc";
  onSortChange?: (column: string) => void;
}

export function DataTable<TData, TValue>({
  columns = [],
  data = [],
  pageCount,
  paginationState,
  handlePageChange,
  sortBy,
  sortType,
  onSortChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: (updater) => {
      const newPageIndex =
        typeof updater === "function"
          ? updater(paginationState)?.pageIndex
          : updater?.pageIndex;
      handlePageChange(newPageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <ScrollArea className="grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)] ">
      <Table className="relative">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup?.headers?.map((header) => {
                return (
                  <TableHead
                    key={header?.id}
                    className={`px-5 whitespace-nowrap ${
                      header.column.getCanSort() ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      header.column.getCanSort() &&
                      onSortChange?.(header.column.id)
                    }
                  >
                    {header?.isPlaceholder
                      ? null
                      : flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext()
                        )}

                    {header.column.getCanSort() && (
                      <span>
                        {sortBy === header.column.id ? (
                          sortType === "asc" ? (
                            <ChevronUp className="inline ml-1" size={17} />
                          ) : (
                            <ChevronDown className="inline ml-1" size={17} />
                          )
                        ) : (
                          <ChevronsUpDown className="inline ml-1" size={17} />
                        )}{" "}
                      </span>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel()?.rows?.length ? (
            table.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row?.id}
                data-state={row?.getIsSelected() && "selected"}
              >
                {row.getVisibleCells()?.map((cell) => (
                  <TableCell key={cell?.id} className="px-5">
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
