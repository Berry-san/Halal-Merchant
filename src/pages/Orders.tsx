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
  const orders = [
    {
      orderId: '001',
      customerName: 'Customer A',
      orderDate: '2023-10-29',
      quantity: 2,
      amount: '100',
      status: 'accepted',
      products: [
        { product_name: 'Product A', product_quantity: 1, amount: 50 },
        { product_name: 'Product B', product_quantity: 1, amount: 50 },
      ],
      subTotal: 100, // Total amount for this order
    },
    {
      orderId: '002',
      customerName: 'Customer B',
      orderDate: '2023-10-28',
      quantity: 1,
      amount: '150',
      status: 'shipped',
      products: [
        { product_name: 'Product C', product_quantity: 1, amount: 150 },
      ],
      subTotal: 150,
    },
    {
      orderId: '003',
      customerName: 'Customer C',
      orderDate: '2023-10-27',
      quantity: 3,
      amount: '200',
      status: 'delivered',
      products: [
        { product_name: 'Product D', product_quantity: 2, amount: 100 },
      ],
      subTotal: 200,
    },
    {
      orderId: '004',
      customerName: 'Customer D',
      orderDate: '2023-10-26',
      quantity: 4,
      amount: '250',
      status: 'received',
      products: [
        { product_name: 'Product E', product_quantity: 4, amount: 62.5 },
      ],
      subTotal: 250,
    },
  ]

  const columns: Column[] = [
    { header: 'Order ID', key: 'orderId' },
    { header: 'Date of order', key: 'orderDate' },
    { header: 'Customer name', key: 'customerName' },
    { header: 'Amount', key: 'amount' },
    { header: 'Order status', key: 'status' },
  ]

  // Filter table data based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus
      ? order.status === selectedStatus
      : true
    return matchesSearch && matchesStatus
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedStatus('')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Orders</h2>

      <div className="flex flex-col items-end gap-4 mb-4 md:flex-row">
        <SearchBar
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4">
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
      </div>

      <div className="relative">
        <Table columns={columns} data={filteredOrders} />
      </div>
    </div>
  )
}

export default Order
