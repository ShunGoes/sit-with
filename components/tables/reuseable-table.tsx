import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
    <div className="w-full max-w-full overflow-x-auto custom-scrollbar lg:overflow-x-hidden">
      <table
        className="w-full table-auto border-collapse min-w-[700px] lg:min-w-0"
      >
        <thead className="w-full h-[50px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 text-footer-bg dark:text-[#FFFFFF] border-r border-[#EAECF0] dark:border-gray-700 last:border-r-0 font-normal text-left text-xs whitespace-nowrap"
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
                  className="px-4 text-primary-text border-t border-[#EAECF0] dark:border-gray-700 dark:text-[#A1A1A1] py-2 font-normal text-xs"
                  key={cell.id}
                >
                  <div className="break-words">
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
