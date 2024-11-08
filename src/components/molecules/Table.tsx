import React from 'react'

export interface Column {
  header: string
  key: string
}

interface TableProps {
  columns: Column[]
  data: Array<Record<string, any>>
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
      <table className="min-w-full bg-white">
        <thead className="border-b bg-gray-300">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {column.header}
              </th>
            ))}
            <th className="px-6 py-3"> </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            <>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-gray-700">
                      &#x2026; {/* ellipsis icon for actions */}
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p>No data available</p>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
