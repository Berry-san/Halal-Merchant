import React, { useState } from 'react'
import SelectDropdown from '../components/atoms/SelectDropdown'
import SearchBar from '../components/molecules/SearchBar'
import ProductTable from '../components/molecules/ProductTable'
import { Column } from '../components/molecules/Table'
import {
  useDeleteProduct,
  useProductsList,
  useUpdateProduct,
} from '../hooks/useProducts'
import { Product } from '../shared.types'
import { useNavigate } from 'react-router-dom'
// import paths from '../routes/paths'

const statusOptions = [
  { label: 'Accepted', value: 'accepted' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Received', value: 'received' },
]

const Products: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Fetch products from the API using the hook
  const { data: products = [], isLoading, error } = useProductsList()

  const columns: Column[] = [
    { header: 'Product Info', key: 'productInfo' },
    { header: 'Price', key: 'product_price' },
    { header: 'Inventory', key: 'product_quantity' },
    { header: 'Category', key: 'category_name' },
    { header: 'Status', key: 'status' },
  ]

  const handleEditProduct = (product: Product) => {
    navigate(`/products/edit-product/${product.product_id}`, {
      state: { product },
    })
  }

  const handleAddProduct = () => {
    navigate(`/products/add-product`)
  }

  // Mutation hook for updating product status
  const updateProductMutation = useUpdateProduct()

  const deleteProductMutation = useDeleteProduct()

  // Handle status toggle for each product
  const handleToggleStatus = (
    productId: number | string,
    newStatus: string
  ) => {
    const formData = new FormData()
    formData.append('status', newStatus)

    updateProductMutation.mutate({
      productId,
      updateData: formData,
    })
  }

  // Handle deletion of a product
  const handleDeleteProduct = (productId: number | string) => {
    deleteProductMutation.mutate(productId)
  }

  // Filter table data based on search term and selected status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus
      ? product.category_name === selectedStatus
      : true
    return matchesSearch && matchesStatus
  })

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error loading products: {error.message}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">My Products</h2>
        <div className="space-x-4">
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 text-white rounded bg-secondary"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="flex items-end gap-4 mb-4">
        <SearchBar
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectDropdown
          options={statusOptions}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        />
      </div>

      <ProductTable
        columns={columns}
        data={filteredProducts}
        handleToggleStatus={handleToggleStatus}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct} // Pass delete handler
      />
    </div>
  )
}

export default Products
