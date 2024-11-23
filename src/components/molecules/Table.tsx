import React, { useState } from 'react'
import Modal from './Modal'
import { Order } from '../../shared.types'

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
  const [selectedRow, setSelectedRow] = useState<Order | null>(null)
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

  const handleClose = () => {
    setIsModalVisible(false)
    setSelectedRow(null) // Clear selected data when modal closes
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
                        className="px-6 py-4 text-sm text-gray-700 capitalize whitespace-nowrap"
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
        <Modal isVisible={isModalVisible} onClose={handleClose}>
          {selectedRow && (
            <>
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">
                  Order #{selectedRow.orderId}
                </h2>
                <button className="" onClick={handleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {selectedRow && (
                  <div className="flex flex-col gap-4">
                    <div className="">
                      {/* Table with Product Details */}
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="">
                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                              Product Name
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedRow.products.map((product, index) => (
                            <tr key={index} className="">
                              <td className="px-6 py-4 text-sm text-gray-700 capitalize whitespace-nowrap">
                                {product.product_name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 capitalize whitespace-nowrap">
                                {product.product_quantity}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 capitalize whitespace-nowrap">
                                {product.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Display Sub Total */}
                      <div className="flex justify-end mt-4">
                        <p className="text-lg font-bold">
                          Sub Total:{' '}
                          <span className="text-gray-700">
                            {selectedRow.subTotal}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-500">Order Status:</label>
                      <select
                        value={status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded focus:outline-none"
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
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default Table
