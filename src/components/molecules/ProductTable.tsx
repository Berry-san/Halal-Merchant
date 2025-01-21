// ProductTable.tsx
import React, { useState } from 'react'
import Switch from '../atoms/Switch'
import { Product } from '../../shared.types'
import { Column } from './Table'
import Pagination from '../atoms/Pagination/Pagination'
import ActionDropdown from '../atoms/ActionDropdown' // Updated import to use ActionDropdown
import { getProductImageURL } from '../../utils/getProductImageURL'

interface ProductTableProps {
  columns: Column[]
  data: Product[]
  handleToggleStatus: (id: number | string, newStatus: string) => void
  handleEditProduct: (product: Product) => void
  handleDeleteProduct: (productId: number | string) => void
}

const ProductTable: React.FC<ProductTableProps> = ({
  columns,
  data,
  handleToggleStatus,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  const reversedData = [...data].reverse()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastItem: number = currentPage * itemsPerPage
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage
  const currentUsers = reversedData.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <>
      {currentUsers.length > 0 ? (
        <div className="max-w-full overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-2 text-left">
                    {column.header}
                  </th>
                ))}
                <th className="px-6 py-3"> </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((product) => (
                <tr key={product.product_id} className="text-left border-b">
                  <td className="flex items-center px-6 py-4">
                    <img
                      src={getProductImageURL(product.product_picture)}
                      // src="https://drive.google.com/thumbnail?id=17D-uKAOgsni3PgWd40Qo9MYkjFuXrYAD&sz=w1000"
                      alt={product.product_name}
                      className="w-12 h-12 mr-4 rounded"
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        {product.product_name}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {product.product_model} - {product.product_color}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 tabular-nums">
                    NGN {product.product_price}
                  </td>
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
                      isActive={product.status === '0'} // 0 is active
                      onToggle={() =>
                        handleToggleStatus(
                          product.product_id,
                          product.status === '0' ? '1' : '0' // Toggle between '0' (active) and '1' (inactive)
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-2">
                    <ActionDropdown
                      onEdit={() => handleEditProduct(product)}
                      onDelete={() => handleDeleteProduct(product.product_id)}
                      disabled={false} // optional
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">No products found.</div>
      )}
      {currentUsers.length > 0 ? (
        <>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={paginate}
              totalCount={data.length}
              pageSize={itemsPerPage}
              siblingCount={1}
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default ProductTable
