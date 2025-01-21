import { useState } from 'react'
import { useUpdateOrderStatus } from '../../hooks/useOrder'
import Modal from './Modal'

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
  const [isOpen, setIsOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<number>(0)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { mutate: updateOrderStatus } = useUpdateOrderStatus(newStatus)

  const handleRowClick = (row: any) => {
    console.log(row)
    setSelectedRow(row)
    setIsOpen(true)
  }

  const handleChangeStatus = (status: any) => {
    console.log(status)
    setNewStatus(status)

    const newStatusData = {
      newStatus: status,
      customerId: selectedRow.customer_id,
      merchantId: selectedRow.merchant_id,
    }
    // updateOrderStatus(newStatusData)
    console.log(newStatusData)
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
                  className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase "
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
                    className="max-w-[10rem] px-6 py-4 text-sm text-gray-700 capitalize truncate whitespace-nowrap"
                  >
                    {column.format
                      ? column.format(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    className="px-4 py-2 font-bold text-white capitalize rounded-md bg-secondary"
                    onClick={() => handleRowClick(row)}
                  >
                    update status
                  </button>
                  {/* <select
                    name="status"
                    id="status"
                    onChange={(e) => handleChangeStatus(row, e.target.value)}
                    className="px-4 py-2 font-bold text-white capitalize rounded-md bg-secondary"
                  >
                    <option value="1">Pending</option>
                    <option value="2">Delivered</option>
                    <option value="3">Cancelled</option>
                  </select> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isVisible={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-96 text-secondary">
          <div className="flex items-center justify-between px-6 py-2 text-xl border-b">
            <h2>Order No: {selectedRow?.order_reference}</h2>
            <button onClick={() => setIsOpen(false)}>
              {/* close svg */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="flex flex-col px-6 py-2 space-y-3">
            <p>
              Order Date:{' '}
              {new Date(selectedRow?.insert_date).toLocaleDateString()}
            </p>
            <p>Total Amount: {Number(selectedRow?.price).toLocaleString()}</p>
            {/* <button
              className="px-4 py-2 mt-4 text-white rounded bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button> */}
            <select
              name="status"
              id="status"
              onChange={(e) => handleChangeStatus(e.target.value)}
              className="px-4 py-2 capitalize border rounded-md"
            >
              <option value="1">Pending</option>
              <option value="2">Delivered</option>
              <option value="3">Cancelled</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Table
