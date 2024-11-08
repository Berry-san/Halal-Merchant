import { useState } from 'react'
import SelectDropdown from '../components/atoms/SelectDropdown'
import SearchBar from '../components/molecules/SearchBar'
import ProductTable from '../components/molecules/ProductTable'
import { Column } from '../components/molecules/Table'
import { useProductsList, useUpdateProduct } from '../hooks/useProducts'
import { Product } from '../shared.types'

const statusOptions = [
  { label: 'Accepted', value: 'accepted' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Received', value: 'received' },
]

const Products: React.FC = () => {
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

  // Mutation hook for updating product status
  const updateProductMutation = useUpdateProduct()

  // Handle status toggle for each product
  const handleToggleStatus = (productId: number, newStatus: string) => {
    updateProductMutation.mutate({
      productId,
      status: newStatus, // Directly pass status here
    })
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
      <h2>My Products</h2>
      <div className="mb-4 flex gap-4 items-end">
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
      />
    </div>
  )
}

export default Products
