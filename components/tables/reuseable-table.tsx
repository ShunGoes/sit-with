import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface TableDateProps<T> {
  tableData: T[];
  columns: ColumnDef<T>[];
  className?: string;
}

const ReuseableTable = <T,>({ tableData, columns }: TableDateProps<T>) => {
  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full max-w-full overflow-x-auto custom-scrollbar">
      <table
        className="w-full table-fixed border-collapse"
        style={{ minWidth: "700px" }}
      >
        <thead className="w-full h-[50px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={{
                    width: header.getSize(),
                  }}
                  key={header.id}
                  className="px-5 text-footer-bg dark:text-[#FFFFFF] border-r border-[#EAECF0] dark:border-gray-700 last:border-r-0 font-normal text-left text-xs"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="mt-5">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  style={{
                    width: cell.column.getSize(),
                  }}
                  className="px-5 text-primary-text border-t border-[#EAECF0] dark:border-gray-700 dark:text-[#A1A1A1] py-2 font-normal text-xs"
                  key={cell.id}
                >
                  <div className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReuseableTable;
