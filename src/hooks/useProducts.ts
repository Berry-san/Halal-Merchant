import { useQuery, useMutation, useQueryClient } from 'react-query'
import { productService } from '../api'
import { Product, ProductDetails, UpdateProductRequest } from '../shared.types'

export function useProductsList() {
  return useQuery<Product[], Error>(
    'productsList',
    productService.fetchProductsList
  )
}

export function useProductListByID(merchantId: number | string) {
  return useQuery<Product[], Error>(['productsList', merchantId], () =>
    productService.fetchProductsByMerchantId(merchantId)
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
    (productData: FormData) => productService.addProduct(productData),
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
    ({
      updateData,
    }: {
      updateData: UpdateProductRequest | FormData // Accept both types
    }) => productService.updateProduct(updateData), // Pass the data directly
    {
      onSuccess: () => {
        queryClient.invalidateQueries('productsList') // Refresh product list
      },
    }
  )
}

// export function useUpdateProduct() {
//   const queryClient = useQueryClient()
//   return useMutation(
//     ({
//       productId,
//       updateData,
//     }: {
//       productId: number | string
//       updateData: UpdateProductRequest | FormData // Accept both types
//     }) => {
//       let dataToSend: FormData | UpdateProductRequest = updateData

//       // Convert to FormData if updateData is not already a FormData instance
//       if (!(updateData instanceof FormData)) {
//         const formData = new FormData()

//         // Convert each field in UpdateProductRequest to FormData
//         Object.keys(updateData).forEach((key) => {
//           const value = updateData[key as keyof UpdateProductRequest]
//           if (
//             value !== undefined &&
//             value !== null &&
//             typeof value !== 'object'
//           ) {
//             formData.append(key, String(value))
//           }
//         })

//         // Handle product_picture if it exists
//         if (updateData.product_picture) {
//           Object.keys(updateData.product_picture).forEach((key) => {
//             const picture =
//               updateData.product_picture?.[
//                 key as keyof typeof updateData.product_picture
//               ]
//             if (picture) {
//               if (typeof picture === 'string') {
//                 formData.append(`${key}_url`, picture) // Append URL if string
//               } else if (picture instanceof Blob) {
//                 formData.append(key, picture) // Append as file if Blob/File
//               } else {
//                 throw new Error(`Invalid format for ${key}.`)
//               }
//             }
//           })
//         }

//         dataToSend = formData
//       }

//       return productService.updateProduct(productId, dataToSend)
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('productsList') // Refresh product list
//       },
//     }
//   )
// }

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation(
    (productId: number | string) => productService.deleteProduct(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('productsList') // Refresh product list
      },
    }
  )
}
