// hooks/useSummaryData.ts
import { useState, useEffect } from 'react'
import { apiBase } from '../api/apiBase'

const useSummaryData = (startDate: Date | null, endDate: Date | null) => {
  const [summaryData, setSummaryData] = useState<any>(null)

  useEffect(() => {
    const fetchSummaryData = async () => {
      const queryParams = new URLSearchParams()
      if (startDate)
        queryParams.append('startDate', startDate.toISOString().split('T')[0])
      if (endDate)
        queryParams.append('endDate', endDate.toISOString().split('T')[0])

      try {
        const response = await apiBase.get(
          `/merchant_stats/2/?${queryParams.toString()}`
        )
        const data = response.data.data

        // Set data values to 0 if they are null
        const updatedData = {
          total_customers: data.total_customers ?? 0,
          total_orders: data.total_orders ?? 0,
          total_amount: data.total_amount ?? 0,
          average_amount: data.average_amount ?? 0,
          total_customers_month: data.total_customers_month ?? 0,
          total_orders_month: data.total_orders_month ?? 0,
          total_amount_month: data.total_amount_month ?? 0,
          average_amount_month: data.average_amount_month ?? 0,
        }

        setSummaryData(updatedData)
      } catch (error) {
        console.error('Error fetching summary data:', error)
      }
    }

    fetchSummaryData()
  }, [startDate, endDate])

  return summaryData
}

export default useSummaryData
