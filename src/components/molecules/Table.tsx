export interface Column {
  header: string
  key: string
  format?: (value: any) => React.ReactNode
}

interface TableProps {
  columns: Column[]
  data: Array<Record<string, any>>
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <>
      <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-300 border-b">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                >
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-3"> </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                // onClick={() => handleRowClick(row)}
                className="cursor-pointer"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-gray-700 capitalize whitespace-nowrap"
                  >
                    {column.format
                      ? column.format(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
