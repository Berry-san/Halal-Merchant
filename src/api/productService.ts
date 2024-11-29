import { Product, ProductDetails, UpdateProductRequest } from '../shared.types'
import { apiBase } from './apiBase'
import { toast } from 'react-toastify'

const BASE_URL = '/products'

export const productService = {
  // Fetch the list of products
  async fetchProductsList(): Promise<Product[]> {
    try {
      const response = await apiBase.get(`${BASE_URL}/products_list`)
      return response.data.products
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  // Fetch preoducts by merchantId
  async fetchProductsByMerchantId(
    merchantId: number | string
  ): Promise<Product[]> {
    try {
      const response = await apiBase.get(
        `${BASE_URL}/merchant_details/${merchantId}`
        // `${BASE_URL}/merchant_details/66`
      )
      return response.data.productDetails
    } catch (error) {
      console.error('Error fetching products by merchantId:', error)
      throw new Error('Could not fetch products by merchantId')
    }
  },

  // Fetch details for a specific product by ID
  async fetchProductDetails(productId: number): Promise<ProductDetails> {
    try {
      const response = await apiBase.get(
        `${BASE_URL}/product_details/${productId}`
      )
      return response.data.productDetails
    } catch (error) {
      console.error(
        `Error fetching product details for ID ${productId}:`,
        error
      )
      throw new Error('Could not fetch product details')
    }
  },

  // Add a new product to the database
  async addProduct(formData: FormData): Promise<void> {
    try {
      const response = await apiBase.post(`${BASE_URL}/add_product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      toast.error(
        'Could not add new product. Ensure all fields are filled out.'
      )
      console.error('Error adding new product:', error)
      throw new Error('Could not add new product')
    }
  },

  // Update an existing product by ID
  async updateProduct(
    updateData: FormData | UpdateProductRequest
  ): Promise<void> {
    try {
      const dataToSend =
        updateData instanceof FormData ? updateData : new FormData()

      if (!(updateData instanceof FormData)) {
        // Convert JSON data to FormData
        Object.keys(updateData).forEach((key) => {
          const value = updateData[key as keyof UpdateProductRequest]
          if (
            value !== undefined &&
            value !== null &&
            typeof value !== 'object'
          ) {
            dataToSend.append(key, String(value))
          }
        })

        // Check if product_picture exists before accessing it
        if (updateData.product_picture) {
          Object.keys(updateData.product_picture).forEach((key) => {
            const picture = updateData.product_picture?.[key]
            if (picture) {
              if (typeof picture === 'string') {
                dataToSend.append(`${key}_url`, picture) // Append URL if string
              } else if (picture instanceof Blob) {
                dataToSend.append(key, picture) // Append as file if Blob/File
              }
            }
          })
        }
      }

      await apiBase.put(`${BASE_URL}/update_product`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.error(`Error updating product:`, error)
      throw new Error('Could not update product')
    }
  },
  // Delete a product by ID
  async deleteProduct(productId: number | string): Promise<void> {
    try {
      await apiBase.post(`${BASE_URL}/delete_product/${productId}`)
      console.log(`Product with ID ${productId} has been deleted successfully`)
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error)
      throw new Error('Could not delete product')
    }
  },
}
