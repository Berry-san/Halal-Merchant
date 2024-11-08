// productService.ts
import {
  Product,
  ProductDetails,
  AddProductRequest,
  UpdateProductRequest,
} from '../shared.types'
import { apiBase } from './apiBase'

const BASE_URL = '/products'

export const productService = {
  // Fetch products list
  async fetchProductsList(): Promise<Product[]> {
    const response = await apiBase.get(`${BASE_URL}/products_list`)
    console.log(response.data)
    return response.data.products
  },

  // Fetch product details
  async fetchProductDetails(productId: number): Promise<ProductDetails> {
    const response = await apiBase.get(
      `${BASE_URL}/product_details/${productId}`
    )
    return response.data
  },

  // Add new product
  async addProduct(productData: AddProductRequest): Promise<Product> {
    const response = await apiBase.post(`${BASE_URL}/add_product`, productData)
    return response.data
  },

  // Update product
  async updateProduct(
    productId: number,
    updateData: UpdateProductRequest
  ): Promise<void> {
    const response = await apiBase.post(
      `${BASE_URL}/update_product/${productId}`,
      updateData
    )
    console.log(response.data)
    return response.data
  },

  // Delete product
  async deleteProduct(productId: number): Promise<void> {
    await apiBase.delete(`${BASE_URL}/delete_product/${productId}`)
  },
}
