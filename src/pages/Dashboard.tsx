// import Greeting from '../components/atoms/Greeting'
// import Switch from '../components/atoms/Switch'
// import Table, { Column } from '../components/molecules/Table'
// interface SummaryItem {
//   title: string
//   value: string | number
// }

// const Dashboard = () => {
//   const summaryData: SummaryItem[] = [
//     { title: 'Total revenue', value: 'NGN 350,000' },
//     { title: 'Total customers', value: 150 },
//     { title: 'Total products', value: 23 },
//     { title: 'Total orders', value: 350 },
//   ]

//   const columns: Column[] = [
//     { header: 'Order ID', key: 'orderId' },
//     { header: 'Product name', key: 'productName' },
//     { header: 'Date of order', key: 'orderDate' },
//     { header: 'Quantity', key: 'quantity' },
//     { header: 'Amount', key: 'amount' },
//   ]

//   const orderData = [
//     {
//       orderId: '0124',
//       productName: 'Infinity pro x phone',
//       orderDate: '23/02/2024',
//       quantity: 1,
//       amount: '300,000',
//     },
//     {
//       orderId: '0419',
//       productName: 'ApexSpectra',
//       orderDate: '23/02/2024',
//       quantity: 3,
//       amount: '250,000',
//     },
//     {
//       orderId: '0123',
//       productName: 'QuantumShift',
//       orderDate: '23/02/2024',
//       quantity: 2,
//       amount: '350,000',
//     },
//     {
//       orderId: '0456',
//       productName: 'GalaxyPulse',
//       orderDate: '23/02/2024',
//       quantity: 5,
//       amount: '100,000',
//     },
//     {
//       orderId: '0985',
//       productName: 'CelestialOne',
//       orderDate: '23/02/2024',
//       quantity: 1,
//       amount: '1,350,000',
//     },
//   ]

//   const tableHeader = {}
//   return (
//     <div>
//       <Greeting />
//       <h3>Store Summary</h3>
//       <section className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-4">
//         {summaryData.map((item, index) => (
//           <div
//             className="h-32 px-5 pt-8 font-mono border border-border_color rounded-xl bg-secondary"
//             key={index}
//           >
//             <div className="flex items-center justify-between">
//               <div className="font-semibold text-white">
//                 <div className="text-2xl font-semibold">{item.value}</div>
//                 <div className="text-sm">{item.title}</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold">New orders</h2>
//         <Table columns={columns} data={orderData} />
//       </div>
//     </div>
//   )
// }

// export default Dashboard

// pages/Dashboard.tsx
import { useState } from 'react'
import Greeting from '../components/atoms/Greeting'
import Table, { Column } from '../components/molecules/Table'
import DatePickerComponent from '../components/atoms/DatePickerComponent'
import SummaryCard from '../components/molecules/SummaryCard'
import useSummaryData from '../hooks/useSummaryData'

interface SummaryItem {
  title: string
  value: string | number
}

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  // Fetch summary data using custom hook
  const summaryData = useSummaryData(startDate, endDate)

  const handleStartDateChange = (date: Date | null) => {
    if (endDate && date && date > endDate) {
      alert('Start date cannot be later than end date.')
      return
    }
    setStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    if (startDate && date && date < startDate) {
      alert('End date cannot be earlier than start date.')
      return
    }
    setEndDate(date)
  }

  const columns: Column[] = [
    { header: 'Order ID', key: 'orderId' },
    { header: 'Product name', key: 'productName' },
    { header: 'Date of order', key: 'orderDate' },
    { header: 'Quantity', key: 'quantity' },
    { header: 'Amount', key: 'amount' },
  ]

  const orderData = [
    {
      orderId: '0124',
      productName: 'Infinity pro x phone',
      orderDate: '23/02/2024',
      quantity: 1,
      amount: '300,000',
    },
    {
      orderId: '0419',
      productName: 'ApexSpectra',
      orderDate: '23/02/2024',
      quantity: 3,
      amount: '250,000',
    },
    {
      orderId: '0123',
      productName: 'QuantumShift',
      orderDate: '23/02/2024',
      quantity: 2,
      amount: '350,000',
    },
    {
      orderId: '0456',
      productName: 'GalaxyPulse',
      orderDate: '23/02/2024',
      quantity: 5,
      amount: '100,000',
    },
    {
      orderId: '0985',
      productName: 'CelestialOne',
      orderDate: '23/02/2024',
      quantity: 1,
      amount: '1,350,000',
    },
  ]

  return (
    <div>
      <Greeting />
      <h3>Store Summary</h3>
      {/* Date Picker for Filtering Summary Data */}
      <div className="flex items-center gap-4 mb-4">
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
      </div>
      {summaryData ? (
        <section className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard title="Total revenue" value={summaryData.total_amount} />
          <SummaryCard
            title="Total customers"
            value={summaryData.total_customers}
          />
          <SummaryCard title="Total orders" value={summaryData.total_orders} />
          <SummaryCard title="Total amount" value={summaryData.total_amount} />
        </section>
      ) : (
        <p>Loading summary data...</p>
      )}

      {/* New Orders Table (Unfiltered) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">New orders</h2>
        <Table columns={columns} data={orderData} />
      </div>
    </div>
  )
}

export default Dashboard
