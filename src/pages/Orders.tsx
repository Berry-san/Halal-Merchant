import { useState } from 'react'
import SelectDropdown from '../components/atoms/SelectDropdown'
import SearchBar from '../components/molecules/SearchBar'
import Table, { Column } from '../components/molecules/Table'

const statusOptions = [
  { label: 'Accepted', value: 'accepted' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Received', value: 'received' },
]
const Order = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Sample table data
  const products = [
    {
      orderId: '001',
      productName: 'Product A',
      orderDate: '2023-10-29',
      quantity: 2,
      amount: '100',
      status: 'accepted',
    },
    {
      orderId: '002',
      productName: 'Product B',
      orderDate: '2023-10-28',
      quantity: 1,
      amount: '150',
      status: 'shipped',
    },
    {
      orderId: '003',
      productName: 'Product C',
      orderDate: '2023-10-27',
      quantity: 3,
      amount: '200',
      status: 'delivered',
    },
    {
      orderId: '004',
      productName: 'Product D',
      orderDate: '2023-10-26',
      quantity: 4,
      amount: '250',
      status: 'received',
    },
    // More sample data...
  ]

  const columns: Column[] = [
    { header: 'Order ID', key: 'orderId' },
    { header: 'Product name', key: 'productName' },
    { header: 'Date of order', key: 'orderDate' },
    { header: 'Quantity', key: 'quantity' },
    { header: 'Amount', key: 'amount' },
  ]

  // Filter table data based on search term and status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus
      ? product.status === selectedStatus
      : true
    return matchesSearch && matchesStatus
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedStatus('')
  }

  return (
    <div className="">
      <h2>My Orders</h2>

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
        <button
          onClick={clearFilters}
          className="w-40 px-4 py-2 text-white rounded bg-secondary"
        >
          Clear Filters
        </button>
      </div>

      <div className="relative">
        <Table columns={columns} data={filteredProducts} />
      </div>
    </div>
  )
}

export default Order
