import Table, { Column } from '../components/molecules/Table'
// import DatePickerComponent from '../components/atoms/DatePickerComponent'
import SummaryCard from '../components/molecules/SummaryCard'
import useSummaryData from '../hooks/useSummaryData'
import { useMerchantStore } from '../store/useMerchantStore'
import { useMerchantOrders } from '../hooks/useOrder'

const Dashboard = () => {
  // const [startDate, setStartDate] = useState<Date | null>(null)
  // const [endDate, setEndDate] = useState<Date | null>(null)

  const startDate = null
  const endDate = null

  // Fetch summary data using custom hook
  const summaryData = useSummaryData(startDate, endDate)

  // const handleStartDateChange = (date: Date | null) => {
  //   if (endDate && date && date > endDate) {
  //     alert('Start date cannot be later than end date.')
  //     return
  //   }
  //   setStartDate(date)
  // }

  // const handleEndDateChange = (date: Date | null) => {
  //   if (startDate && date && date < startDate) {
  //     alert('End date cannot be earlier than start date.')
  //     return
  //   }
  //   setEndDate(date)
  // }

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

  const { merchant } = useMerchantStore() // Get merchant ID from the store
  const merchantId = merchant?.merchantId
  console.log(merchant)

  if (!merchantId) {
    return <div>Loading merchant data...</div>
  }

  // const {
  //   data: orders = [],
  //   isLoading,
  //   isError,
  // } = useMerchantOrders(merchantId)
  const {
    data: rawOrders = [],
    isLoading,
    isError,
  } = useMerchantOrders(merchantId)

  // Add order_reference to each order
  const orders = rawOrders.map((order) => ({
    ...order,
    order_reference: `ORD#${Math.random().toString().slice(2, 8)}`, // Generate unique reference
  }))

  const mostRecent = orders.reverse().slice(0, 5)

  if (isLoading) {
    return <div>Loading orders...</div>
  }

  if (isError) {
    return <div>Failed to load orders. Please try again later.</div>
  }

  return (
    <div>
      <h3 className="text-2xl font-bold">Store Summary</h3>
      {/* Date Picker for Filtering Summary Data */}
      {/* <div className="flex items-center gap-4 mb-4">
        <DatePickerComponent
          label="Start Date"
          selectedDate={startDate}
          onChange={handleStartDateChange}
        />
        <DatePickerComponent
          label="End Date"
          selectedDate={endDate}
          onChange={handleEndDateChange}
        />
      </div> */}
      <section className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total revenue"
          value={summaryData?.total_amount || 0}
        />
        <SummaryCard
          title="Total customers"
          value={summaryData?.total_customers || 0}
        />
        <SummaryCard
          title="Total orders"
          value={summaryData?.total_orders || 0}
        />
        <SummaryCard
          title="Total amount"
          value={summaryData?.total_amount || 0}
        />
      </section>

      {/* New Orders Table (Unfiltered) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">New orders</h2>
        <div className="relative">
          {mostRecent.length > 0 ? (
            <Table columns={columns} data={mostRecent} />
          ) : (
            <div className="text-center">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
