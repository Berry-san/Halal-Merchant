// ProductTable.tsx
import React, { useState } from 'react'
import Switch from '../atoms/Switch'
import { Product } from '../../shared.types'
import { Column } from './Table'
import Pagination from '../atoms/Pagination/Pagination'

interface ProductTableProps {
  columns: Column[]
  data: Product[]
  handleToggleStatus: (id: number, newStatus: string) => void
}

const ProductTable: React.FC<ProductTableProps> = ({
  columns,
  data,
  handleToggleStatus,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const usersPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser: number = currentPage * usersPerPage
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage

  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-2 text-left">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((product) => (
                <tr key={product.product_id} className="text-left border-b">
                  <td className="px-6 py-4 flex items-center">
                    <img
                      src={product.product_picture.picture1}
                      alt={product.product_name}
                      className="w-12 h-12 rounded mr-4"
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        {product.product_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.product_model} - {product.product_color}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">NGN {product.product_price}</td>
                  <td className="px-4 py-2">{product.product_quantity}</td>
                  <td className="px-4 py-2">
                    <div>
                      <div className="text-sm font-semibold">
                        {product.category_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.subcategory_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Switch
                      isActive={product.status === '1'} // 0 is active
                      onToggle={() =>
                        handleToggleStatus(
                          product.product_id,
                          product.status === '1' ? '0' : '1' // Toggle between 1 (active) and 0 (inactive)
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="font-bold px-4" colSpan={columns.length}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {currentUsers ? (
        <>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={paginate}
              totalCount={data.length}
              pageSize={usersPerPage}
              siblingCount={1}
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default ProductTable
