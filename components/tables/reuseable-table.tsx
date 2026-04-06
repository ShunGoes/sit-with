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
  const [data] = useState(tableData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className=" overflow-x-auto custom-scrollbar">
      <table
        className="w-full space-y-10 rounded-lg  overflow-hidden "
        style={{ minWidth: "700px" }}
      >
        <thead className="w-full  [&>tr>th]:px-4   h-[50px] ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={{
                    width: header.getSize(),
                  }}
                  key={header.id}
                  className={`text-[#5A5775] uppercase text-left text-[0.75rem] font-bold  `}
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

        <tbody className="[&>tr>td]:px-4 mt-5">
          {table.getRowModel().rows.map((row) => (
            <tr className=" " key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  style={{
                    width: cell.column.getSize(),
                  }}
                  className={`text-[#374151]  h-[77px] font-normal leading-6 text-[1rem] `}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
