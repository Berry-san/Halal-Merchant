// orderService.ts
import axios from 'axios'
import {
  OrderDetails,
  UpdateOrderStatusRequest,
  OrderHistoryItem,
  MerchantOrder,
  DeliveryStatus,
} from '../shared.types'

const BASE_URL = 'http://194.163.149.51:3015/hialal/orders'

export const orderService = {
  // Fetch order details by order ID
  async fetchOrderDetails(orderId: number): Promise<OrderDetails> {
    const response = await axios.get(`${BASE_URL}/order_details/${orderId}`)
    return response.data
  },

  // Update order status
  async updateOrderStatus(
    orderId: number,
    status: UpdateOrderStatusRequest
  ): Promise<void> {
    await axios.put(`${BASE_URL}/update_order_status/${orderId}`, status)
  },

  // Fetch orders for a specific merchant
  async fetchMerchantOrders(merchantId: number): Promise<MerchantOrder[]> {
    const response = await axios.get(
      `${BASE_URL}/merchant_orders/${merchantId}`
    )
    return response.data
  },

  // Fetch current order status
  async fetchOrderStatus(orderId: number): Promise<string> {
    const response = await axios.get(`${BASE_URL}/order_status/${orderId}`)
    return response.data
  },

  // Fetch order status history
  async fetchOrderStatusHistory(orderId: number): Promise<OrderHistoryItem[]> {
    const response = await axios.get(
      `${BASE_URL}/order_status_history/${orderId}`
    )
    return response.data
  },

  // Fetch delivery status
  async fetchDeliveryStatus(orderId: number): Promise<DeliveryStatus> {
    const response = await axios.get(`${BASE_URL}/delivery_status/${orderId}`)
    return response.data
  },
}
