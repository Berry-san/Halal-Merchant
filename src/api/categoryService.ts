// categoryService.ts
import {
  Category,
  Subcategory,
  AddCategoryRequest,
  AddSubcategoryRequest,
  UpdateCategoryRequest,
  UpdateSubcategoryRequest,
} from '../shared.types'
import { apiBase } from './apiBase'

const BASE_URL = '/categories'

export const categoryService = {
  // Fetch all categories
  async fetchAllCategories(): Promise<Category[]> {
    const response = await apiBase.get(`${BASE_URL}/all_categories`)
    return response.data
  },

  // Add a new category
  async addCategory(data: AddCategoryRequest): Promise<void> {
    await apiBase.post(`${BASE_URL}/add_categories`, data)
  },

  // Fetch all subcategories
  async fetchAllSubcategories(): Promise<Subcategory[]> {
    const response = await apiBase.get(`${BASE_URL}/all_subcategories`)
    return response.data
  },

  // Fetch subcategories by category ID
  async fetchSubcategoriesByCategoryId(
    categoryId: number
  ): Promise<Subcategory[]> {
    const response = await apiBase.get(
      `${BASE_URL}/subcategories/${categoryId}`
    )
    return response.data
  },

  // Add a new subcategory
  async addSubcategory(data: AddSubcategoryRequest): Promise<void> {
    await apiBase.post(`${BASE_URL}/add_subcategories`, data)
  },

  // Update an existing category
  async updateCategory(
    categoryId: number,
    data: UpdateCategoryRequest
  ): Promise<void> {
    await apiBase.post(`${BASE_URL}/update_categories/${categoryId}`, data)
  },

  // Update an existing subcategory
  async updateSubcategory(
    subcategoryId: number,
    data: UpdateSubcategoryRequest
  ): Promise<void> {
    await apiBase.post(
      `${BASE_URL}/update_subcategories/${subcategoryId}`,
      data
    )
  },

  // Delete a category
  async deleteCategory(categoryId: number): Promise<void> {
    await apiBase.post(`${BASE_URL}/delete_categories/${categoryId}`)
  },

  // Delete a subcategory
  async deleteSubcategory(subcategoryId: number): Promise<void> {
    await apiBase.post(`${BASE_URL}/delete_subcategories/${subcategoryId}`)
  },
}
