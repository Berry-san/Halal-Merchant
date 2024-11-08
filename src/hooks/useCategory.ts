// useCategories.ts
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { categoryService } from '../api'
import {
  Category,
  Subcategory,
  AddCategoryRequest,
  AddSubcategoryRequest,
  UpdateCategoryRequest,
  UpdateSubcategoryRequest,
} from '../shared.types'

export function useAllCategories() {
  return useQuery<Category[], Error>(
    'categories',
    categoryService.fetchAllCategories
  )
}

export function useAddCategory() {
  const queryClient = useQueryClient()
  return useMutation(
    (data: AddCategoryRequest) => categoryService.addCategory(data),
    {
      onSuccess: () => queryClient.invalidateQueries('categories'),
    }
  )
}

export function useAllSubcategories() {
  return useQuery<Subcategory[], Error>(
    'subcategories',
    categoryService.fetchAllSubcategories
  )
}

export function useSubcategoriesByCategoryId(categoryId: number) {
  return useQuery<Subcategory[], Error>(['subcategories', categoryId], () =>
    categoryService.fetchSubcategoriesByCategoryId(categoryId)
  )
}

export function useAddSubcategory() {
  const queryClient = useQueryClient()
  return useMutation(
    (data: AddSubcategoryRequest) => categoryService.addSubcategory(data),
    {
      onSuccess: () => queryClient.invalidateQueries('subcategories'),
    }
  )
}

export function useUpdateCategory(categoryId: number) {
  const queryClient = useQueryClient()
  return useMutation(
    (data: { categoryName: string; description: string }) =>
      categoryService.updateCategory(categoryId, data),
    {
      onSuccess: () => queryClient.invalidateQueries('categories'),
    }
  )
}

export function useUpdateSubcategory(subcategoryId: number) {
  const queryClient = useQueryClient()
  return useMutation(
    (data: { subcategoryName: string; description: string }) =>
      categoryService.updateSubcategory(subcategoryId, data),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['subcategories', subcategoryId]),
    }
  )
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation(
    (categoryId: number) => categoryService.deleteCategory(categoryId),
    {
      onSuccess: () => queryClient.invalidateQueries('categories'),
    }
  )
}

export function useDeleteSubcategory() {
  const queryClient = useQueryClient()
  return useMutation(
    (subcategoryId: number) => categoryService.deleteSubcategory(subcategoryId),
    {
      onSuccess: () => queryClient.invalidateQueries('subcategories'),
    }
  )
}
