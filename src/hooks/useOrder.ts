// useOrders.ts
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { orderService } from '../api'
import {
  OrderDetails,
  UpdateOrderStatusRequest,
  OrderHistoryItem,
  MerchantOrder,
  DeliveryStatus,
} from '../shared.types'

export function useOrderDetails(orderId: number) {
  return useQuery<OrderDetails, Error>(['orderDetails', orderId], () =>
    orderService.fetchOrderDetails(orderId)
  )
}

export function useUpdateOrderStatus(orderId: number) {
  const queryClient = useQueryClient()
  return useMutation(
    (newStatusData: UpdateOrderStatusRequest) =>
      orderService.updateOrderStatus(newStatusData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['orderDetails', orderId])
        queryClient.invalidateQueries(['orderStatus', orderId])
        queryClient.invalidateQueries(['orderStatusHistory', orderId])
      },
    }
  )
}

export function useMerchantOrders(merchantId: number | string) {
  return useQuery<MerchantOrder[], Error>(['merchantOrders', merchantId], () =>
    orderService.fetchMerchantOrders(merchantId)
  )
}

export function useOrderStatus(orderId: number) {
  return useQuery<string, Error>(['orderStatus', orderId], () =>
    orderService.fetchOrderStatus(orderId)
  )
}

export function useOrderStatusHistory(orderId: number) {
  return useQuery<OrderHistoryItem[], Error>(
    ['orderStatusHistory', orderId],
    () => orderService.fetchOrderStatusHistory(orderId)
  )
}

export function useDeliveryStatus(orderId: number) {
  return useQuery<DeliveryStatus, Error>(['deliveryStatus', orderId], () =>
    orderService.fetchDeliveryStatus(orderId)
  )
}

export function useAllOrders() {
  return useQuery<MerchantOrder[], Error>(
    'allOrders',
    orderService.fetchAllOrders
  )
}
