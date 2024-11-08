import { useQuery, useMutation, useQueryClient } from 'react-query'
import { productService } from '../api'
import {
  Product,
  ProductDetails,
  AddProductRequest,
  UpdateProductRequest,
} from '../shared.types'

export function useProductsList() {
  return useQuery<Product[], Error>(
    'productsList',
    productService.fetchProductsList
  )
}

export function useProductDetails(productId: number) {
  return useQuery<ProductDetails, Error>(['productDetails', productId], () =>
    productService.fetchProductDetails(productId)
  )
}

export function useAddProduct() {
  const queryClient = useQueryClient()
  return useMutation(
    (productData: AddProductRequest) => productService.addProduct(productData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('productsList') // Refresh product list
      },
    }
  )
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation(
    (updateData: { productId: number; status: string }) =>
      productService.updateProduct(updateData.productId, {
        status: updateData.status,
      }), // Send status correctly
    {
      onSuccess: () => {
        queryClient.invalidateQueries('productsList') // Refresh product list
      },
    }
  )
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation(
    (productId: number) => productService.deleteProduct(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('productsList') // Refresh product list
      },
    }
  )
}
