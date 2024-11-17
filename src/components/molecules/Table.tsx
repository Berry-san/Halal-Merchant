import React, { useState } from 'react'
import Modal from './Modal'

export interface Column {
  header: string
  key: string
}

interface TableProps {
  columns: Column[]
  data: Array<Record<string, any>>
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [status, setStatus] = useState('')

  const handleRowClick = (row: any) => {
    setSelectedRow(row)
    setIsModalVisible(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value
    setStatus(newStatus)
    // updateStatus({ orderId, status: newStatus })
  }

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
            {data.length > 0 ? (
              <>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-100">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                      >
                        {row[column.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleRowClick(row)}
                      >
                        &#x2026; {/* ellipsis icon for actions */}
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false)
            setSelectedRow(null) // Clear selected data when modal closes
          }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Row Details</h2>
            <div className="">close</div>
          </div>
          <div className="p-4">
            {selectedRow && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-gray-500">Order Status:</label>
                  <select
                    value={status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded focus:outline-none"
                    // disabled={isLoading}
                  >
                    <option value="accepted">Accepted</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default Table
