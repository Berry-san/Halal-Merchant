import { useState } from 'react'
import SelectDropdown from '../components/atoms/SelectDropdown'
import SearchBar from '../components/molecules/SearchBar'
import Table, { Column } from '../components/molecules/Table'
import { useAllOrders, useMerchantOrders } from '../hooks/useOrder'
import { useMerchantStore } from '../store/useMerchantStore'
import Pagination from '../components/atoms/Pagination/Pagination'

const statusOptions = [
  { label: 'Received', value: 'received' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
]

const Order = () => {
  const { merchant } = useMerchantStore() // Get merchant ID from the store
  const merchantId = merchant?.merchantId

  if (!merchantId) {
    return <div>Error loading merchant data...</div>
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // const {
  //   data: orders = [],
  //   isLoading,
  //   isError,
  // } = useMerchantOrders(merchantId)

  // const reversedData = [...orders].reverse()

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useMerchantOrders(merchantId)

  // const { data: orders = [], isLoading, isError } = useAllOrders()

  const reversedData = [...orders].reverse()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  // const indexOfLastItem: number = currentPage * itemsPerPage
  // const indexOfFirstItem: number = indexOfLastItem - itemsPerPage
  // const currentUsers = reversedData.slice(indexOfFirstItem, indexOfLastItem)

  const statusMapping: Record<string, number> = {
    accepted: 3,
    processing: 1,
    shipped: 2,
    delivered: 4,
  }

  const reverseStatusMapping: Record<number, string> = {
    3: 'Accepted',
    1: 'Processing',
    2: 'Shipped',
    4: 'Delivered',
  }

  const columns: Column[] = [
    { header: 'Order ID', key: 'order_reference' },
    {
      header: 'Date of order',
      key: 'insert_date',
      format: (value) => {
        const date = new Date(value)
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
          date
        )
      },
    },
    { header: 'Product', key: 'product_name' },
    {
      header: 'Amount',
      key: 'price',
      format: (value) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'NGN',
        }).format(value),
    },
    {
      header: 'Quantity',
      key: 'quantity',
      format: (value) =>
        new Intl.NumberFormat('en-US', {
          style: 'decimal',
        }).format(value),
    },
    {
      header: 'Order status',
      key: 'merchant_status',
      format: (value) => {
        const status = reverseStatusMapping[value] || `Unknown (${value})`
        return (
          <span
            className={`px-2 py-1 rounded ${
              status === 'Accepted'
                ? 'bg-green-100 text-green-600'
                : status === 'Processing'
                ? 'bg-yellow-100 text-yellow-600'
                : status === 'Shipped'
                ? 'bg-blue-100 text-blue-600'
                : status === 'Delivered'
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {status}
          </span>
        )
      },
    },
  ]

  // Filter orders based on search term and selected status
  const filteredOrders = reversedData.filter((order) => {
    const matchesSearch =
      order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus
      ? String(order.merchant_status) === String(statusMapping[selectedStatus])
      : true
    return matchesSearch && matchesStatus
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedOrders = filteredOrders.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedStatus('')
  }

  if (isLoading) {
    return <div>Loading orders...</div>
  }

  if (isError) {
    return <div>Failed to load orders. Please try again later.</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Orders</h2>

      <div className="flex flex-col items-end gap-4 mb-4 md:flex-row">
        <SearchBar
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
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
        {paginatedOrders.length > 0 ? (
          <>
            <Table columns={columns} data={paginatedOrders} />
            <div className="flex justify-center mt-2">
              <Pagination
                currentPage={currentPage}
                onPageChange={paginate}
                totalCount={filteredOrders.length}
                pageSize={itemsPerPage}
                siblingCount={1}
              />
            </div>
          </>
        ) : (
          <div className="text-center">No orders found.</div>
        )}
      </div>
    </div>
  )
}

export default Order
