// orderService.ts
import { apiBase } from './apiBase'
import { useState } from 'react'
import {
  OrderDetails,
  UpdateOrderStatusRequest,
  OrderHistoryItem,
  MerchantOrder,
  DeliveryStatus,
} from '../shared.types'

const BASE_URL = ''

export const orderService = {
  // Fetch order details by order ID
  async fetchOrderDetails(orderId: number): Promise<OrderDetails> {
    const response = await apiBase.get(`${BASE_URL}/order_details/${orderId}`)
    return response.data
  },

  // Update order status
  async updateOrderStatus(
    orderId: number,
    status: UpdateOrderStatusRequest
  ): Promise<void> {
    await apiBase.put(`${BASE_URL}/update_order_status/${orderId}`, status)
  },

  // Fetch orders for a specific merchant
  async fetchMerchantOrders(
    merchantId: number | string
  ): Promise<MerchantOrder[]> {
    const response = await apiBase.get(
      // `${BASE_URL}/store_transaction/merchant_details/56`
      `${BASE_URL}/store_transaction/merchant_details/${merchantId}`
    )
    return response.data.merchant_data
  },
  // Fetch current order status

  // Fetch current order status
  async fetchOrderStatus(orderId: number): Promise<string> {
    const response = await apiBase.get(`${BASE_URL}/order_status/${orderId}`)
    return response.data
  },

  // Fetch order status history
  async fetchOrderStatusHistory(orderId: number): Promise<OrderHistoryItem[]> {
    const response = await apiBase.get(
      `${BASE_URL}/order_status_history/${orderId}`
    )
    return response.data
  },

  // Fetch delivery status
  async fetchDeliveryStatus(orderId: number): Promise<DeliveryStatus> {
    const response = await apiBase.get(`${BASE_URL}/delivery_status/${orderId}`)
    return response.data
  },
}
