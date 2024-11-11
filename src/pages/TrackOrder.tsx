import InputField from '../components/atoms/InputField'
import orderImages from '../assets/images/orderImages.png'
import halalLogo from '../assets/images/halalLogo.png'
import { useState } from 'react'
import { apiBase } from '../api/apiBase'

const TrackOrder = () => {
  // State for tracking number input
  const [trackingNumber, setTrackingNumber] = useState('')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handler for tracking number input change
  const handleTrackingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value)
  }

  // Fetch order details
  const fetchOrderDetails = async () => {
    setLoading(true)
    setError(null)
    console.log(error)
    try {
      const response = await apiBase.post(
        '/store_transaction/transaction_details',
        {
          order_reference: trackingNumber,
        }
      )
      setOrderDetails(response.data.result[0])
    } catch (error) {
      setError('Failed to fetch order details. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <header className="sticky top-0 z-30 flex w-full bg-[#101420] border-b border-border_color drop-shadow-2">
        <div className="flex items-center justify-between flex-grow px-3 md:px-6 py-2.5 lg:h-16 shadow-2 2xl:px-11">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="items-center hidden pl-4 text-white lg:flex">
              <img src={halalLogo} className="w-12 h-12" alt="" />
              <p className="font-bold text-white">HalalNest Order Tracker</p>
            </div>
          </div>
        </div>
      </header>
      <main className="px-8 py-6 mx-auto mt-6">
        <div className="grid grid-cols-5 gap-8">
          <section className="flex flex-col col-span-5 gap-4 md:col-span-2">
            <div className="p-4 border rounded">
              <form onSubmit={(e) => e.preventDefault()}>
                <InputField
                  label="Provide your tracking number"
                  value={trackingNumber}
                  name="trackingNumber"
                  onChange={handleTrackingChange}
                />
                <button
                  onClick={fetchOrderDetails}
                  className="px-4 py-2 mt-4 text-white rounded bg-secondary"
                  disabled={!trackingNumber || loading}
                >
                  {loading ? 'Tracking...' : 'Track Order'}
                </button>
              </form>
            </div>
            {orderDetails && (
              <div className="p-4 space-y-6 border rounded">
                <div className="flex flex-col">
                  <p className="text-gray-500">Order Summary</p>
                  <p className="text-sm font-medium">
                    Customer Name: {orderDetails?.register_name}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col justify-between col-span-2 space-y-4 md:col-span-1">
                    <div className="flex flex-col">
                      <p className="text-gray-500">Order ID</p>
                      <p className="text-sm font-medium">
                        {orderDetails?.trans_reference}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Order Date</p>
                      <p className="text-sm font-medium">Lord X</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between col-span-2 space-y-4 md:col-span-1">
                    <div className="flex flex-col">
                      <p className="text-gray-500">Seller Name</p>
                      <p className="text-sm font-medium">
                        {orderDetails?.sender_name}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Estimated Delivery Date</p>
                      <p className="text-sm font-medium">Lord X</p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <p className="text-sm text-gray-500">
                    If you have any issue with your product delivery,{' '}
                    <a href="#" className="underline text-[#50C878]">
                      please send an email to support
                    </a>{' '}
                    by providing a tracking number and the issue.
                  </p>
                </div>
              </div>
            )}
          </section>
          <section className="hidden col-span-3 md:flex">
            <img src={orderImages} alt="" />
          </section>
        </div>
      </main>
    </div>
  )
}

export default TrackOrder
