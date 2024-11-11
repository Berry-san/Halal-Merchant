import { useState } from 'react'
import {
  useAllCategories,
  useSubcategoriesByCategoryId,
  useAddCategory,
  useAddSubcategory,
  useUpdateCategory,
  useUpdateSubcategory,
  useDeleteCategory,
  useDeleteSubcategory,
} from '../hooks/useCategory'
import { Category, Subcategory } from '../shared.types'
import Modal from '../components/molecules/Modal'

const Categories: React.FC = () => {
  //   const {
  //     data: categories,
  //     isLoading: isLoadingCategories,
  //     error: categoriesError,
  //   } = useAllCategories()
  //   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
  //     null
  //   )
  //   const {
  //     data: subcategories,
  //     isLoading: isLoadingSubcategories,
  //     error: subcategoriesError,
  //   } = useSubcategoriesByCategoryId(selectedCategoryId as number)

  //   const [editCategoryId, setEditCategoryId] = useState<number | null>(null)
  //   const [editSubcategoryId, setEditSubcategoryId] = useState<number | null>(
  //     null
  //   )
  //   const [categoryFormData, setCategoryFormData] = useState({
  //     categoryName: '',
  //     description: '',
  //   })
  //   const [subcategoryFormData, setSubcategoryFormData] = useState({
  //     subcategoryName: '',
  //     description: '',
  //   })
  //   const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false)
  //   const [isSubcategoryModalVisible, setIsSubcategoryModalVisible] =
  //     useState(false)

  //   const updateCategoryMutation = useUpdateCategory(editCategoryId as number)
  //   const updateSubcategoryMutation = useUpdateSubcategory(
  //     editSubcategoryId as number
  //   )

  //   const deleteCategoryMutation = useDeleteCategory()
  //   const deleteSubcategoryMutation = useDeleteSubcategory()

  //   const handleEditCategory = (category: Category) => {
  //     setEditCategoryId(category.category_id)
  //     setCategoryFormData({
  //       categoryName: category.category_name,
  //       description: category.description,
  //     })
  //     setIsCategoryModalVisible(true)
  //   }

  //   const handleEditSubcategory = (subcategory: Subcategory) => {
  //     setEditSubcategoryId(subcategory.subcategory_id)
  //     setSubcategoryFormData({
  //       subcategoryName: subcategory.subcategory_name,
  //       description: subcategory.description,
  //     })
  //     setIsSubcategoryModalVisible(true)
  //   }

  //   const handleUpdateCategory = () => {
  //     if (editCategoryId) {
  //       updateCategoryMutation.mutate(categoryFormData, {
  //         onSuccess: () => {
  //           setIsCategoryModalVisible(false)
  //           setEditCategoryId(null)
  //         },
  //       })
  //     }
  //   }

  //   const handleUpdateSubcategory = () => {
  //     if (editSubcategoryId) {
  //       updateSubcategoryMutation.mutate(subcategoryFormData, {
  //         onSuccess: () => {
  //           setIsSubcategoryModalVisible(false)
  //           setEditSubcategoryId(null)
  //         },
  //       })
  //     }
  //   }

  //   const handleDeleteCategory = (categoryId: number) => {
  //     deleteCategoryMutation.mutate(categoryId, {
  //       onSuccess: () => {
  //         if (selectedCategoryId === categoryId) setSelectedCategoryId(null)
  //       },
  //     })
  //   }

  //   const handleDeleteSubcategory = (subcategoryId: number) => {
  //     deleteSubcategoryMutation.mutate(subcategoryId)
  //   }

  //   const handleCategoryClick = (categoryId: number) => {
  //     setSelectedCategoryId((prevId) =>
  //       prevId === categoryId ? null : categoryId
  //     )
  //   }

  //   if (isLoadingCategories) return <div>Loading categories...</div>
  //   if (categoriesError)
  //     return <div>Error loading categories: {categoriesError.message}</div>

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useAllCategories()

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )
  const {
    data: subcategories,
    isLoading: isLoadingSubcategories,
    error: subcategoriesError,
  } = useSubcategoriesByCategoryId(selectedCategoryId as number)

  const [editCategoryId, setEditCategoryId] = useState<number | null>(null)
  const [editSubcategoryId, setEditSubcategoryId] = useState<number | null>(
    null
  )
  const [categoryFormData, setCategoryFormData] = useState({
    categoryName: '',
    description: '',
  })
  const [newCategoryData, setNewCategoryData] = useState({
    categoryName: '',
    description: '',
  })
  const [newSubcategoryData, setNewSubcategoryData] = useState({
    subcategoryName: '',
    description: '',
    categoryId: 0,
  })
  const [subcategoryFormData, setSubcategoryFormData] = useState({
    subcategoryName: '',
    description: '',
  })
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false)
  const [isSubcategoryModalVisible, setIsSubcategoryModalVisible] =
    useState(false)
  const [isAddSubcategoryModalVisible, setIsAddSubcategoryModalVisible] =
    useState(false)
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false) // State to control Add Category Modal visibility

  const addCategoryMutation = useAddCategory()
  const addSubcategoryMutation = useAddSubcategory()
  const updateCategoryMutation = useUpdateCategory(editCategoryId as number)
  const updateSubcategoryMutation = useUpdateSubcategory(
    editSubcategoryId as number
  )
  const deleteCategoryMutation = useDeleteCategory()
  const deleteSubcategoryMutation = useDeleteSubcategory()

  const handleEditCategory = (category: Category) => {
    setEditCategoryId(category.category_id)
    setCategoryFormData({
      categoryName: category.category_name,
      description: category.description,
    })
    setIsCategoryModalVisible(true)
  }

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setEditSubcategoryId(subcategory.subcategory_id)
    setSubcategoryFormData({
      subcategoryName: subcategory.subcategory_name,
      description: subcategory.description,
    })
    setIsSubcategoryModalVisible(true)
  }

  const handleUpdateCategory = () => {
    if (editCategoryId) {
      updateCategoryMutation.mutate(categoryFormData, {
        onSuccess: () => {
          setIsCategoryModalVisible(false)
          setEditCategoryId(null)
        },
      })
    }
  }

  const handleUpdateSubcategory = () => {
    if (editSubcategoryId) {
      updateSubcategoryMutation.mutate(subcategoryFormData, {
        onSuccess: () => {
          setIsSubcategoryModalVisible(false)
          setEditSubcategoryId(null)
        },
      })
    }
  }

  const handleDeleteCategory = (categoryId: number) => {
    deleteCategoryMutation.mutate(categoryId, {
      onSuccess: () => {
        if (selectedCategoryId === categoryId) setSelectedCategoryId(null)
      },
    })
  }

  const handleDeleteSubcategory = (subcategoryId: number) => {
    deleteSubcategoryMutation.mutate(subcategoryId)
  }

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    )
  }

  const handleAddCategory = () => {
    addCategoryMutation.mutate(newCategoryData, {
      onSuccess: () => {
        setIsAddCategoryModalVisible(false)
        setNewCategoryData({ categoryName: '', description: '' })
      },
    })
  }

  const handleAddSubcategory = () => {
    if (newSubcategoryData.categoryId) {
      addSubcategoryMutation.mutate(newSubcategoryData, {
        onSuccess: () => {
          setIsAddSubcategoryModalVisible(false)
          setNewSubcategoryData({
            subcategoryName: '',
            description: '',
            categoryId: 0,
          })
        },
      })
    }
  }

  if (isLoadingCategories) return <div>Loading categories...</div>
  if (categoriesError)
    return <div>Error loading categories: {categoriesError.message}</div>
  console.error(subcategoriesError)

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-4 mb-4 md:flex-row">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="space-x-4">
          <button
            onClick={() => setIsAddCategoryModalVisible(true)}
            className="px-4 py-2 text-white rounded bg-secondary"
          >
            Add Category
          </button>
          <button
            onClick={() => setIsAddSubcategoryModalVisible(true)}
            className="px-4 py-2 text-white rounded bg-secondary"
          >
            Add Subcategory
          </button>
        </div>
      </div>
      <ul>
        {categories?.map((category) => (
          <div key={category.category_id}>
            <h2 className="space-x-5 cursor-pointer">
              <span onClick={() => handleCategoryClick(category.category_id)}>
                <strong>{category.category_name}</strong> -{' '}
                {category.description}
              </span>
              <button
                className="text-blue-500 underline"
                onClick={() => handleEditCategory(category)}
              >
                Edit
              </button>
              <button
                className="text-red-500 underline"
                onClick={() => handleDeleteCategory(category.category_id)}
              >
                Delete
              </button>
            </h2>
            {selectedCategoryId === category.category_id && (
              <ul className="ml-4">
                {isLoadingSubcategories ? (
                  <div>Loading subcategories...</div>
                ) : (
                  subcategories?.map((sub) => (
                    <li key={sub.subcategory_id} className="space-x-5">
                      <span>{sub.subcategory_name}</span>
                      <button
                        className="text-blue-500 underline"
                        onClick={() => handleEditSubcategory(sub)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 underline"
                        onClick={() =>
                          handleDeleteSubcategory(sub.subcategory_id)
                        }
                      >
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        ))}
      </ul>

      {/* Category Edit Modal */}
      <Modal
        isVisible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
      >
        <h3>Edit Category</h3>
        <input
          value={categoryFormData.categoryName}
          onChange={(e) =>
            setCategoryFormData({
              ...categoryFormData,
              categoryName: e.target.value,
            })
          }
        />
        <input
          value={categoryFormData.description}
          onChange={(e) =>
            setCategoryFormData({
              ...categoryFormData,
              description: e.target.value,
            })
          }
        />
        <button onClick={handleUpdateCategory}>Save</button>
      </Modal>

      {/* Subcategory Edit Modal */}
      <Modal
        isVisible={isSubcategoryModalVisible}
        onClose={() => setIsSubcategoryModalVisible(false)}
      >
        <h3>Edit Subcategory</h3>
        <input
          value={subcategoryFormData.subcategoryName}
          onChange={(e) =>
            setSubcategoryFormData({
              ...subcategoryFormData,
              subcategoryName: e.target.value,
            })
          }
        />
        <input
          value={subcategoryFormData.description}
          onChange={(e) =>
            setSubcategoryFormData({
              ...subcategoryFormData,
              description: e.target.value,
            })
          }
        />
        <button onClick={handleUpdateSubcategory}>Save</button>
      </Modal>

      {/* Add Category Modal */}
      {isAddCategoryModalVisible && (
        <Modal
          isVisible={isAddCategoryModalVisible}
          onClose={() => setIsAddCategoryModalVisible(false)}
        >
          <h3 className="mb-4 text-lg font-bold">Add Category</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="block mb-2">Category Name</label>
            <input
              type="text"
              value={newCategoryData.categoryName}
              onChange={(e) =>
                setNewCategoryData((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <label className="block mb-2">Description</label>
            <textarea
              value={newCategoryData.description}
              onChange={(e) =>
                setNewCategoryData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              onClick={handleAddCategory}
              className="px-4 py-2 mt-4 text-white bg-primary"
            >
              Save
            </button>
          </form>
        </Modal>
      )}

      {/* Modal for adding subcategories */}
      {isAddSubcategoryModalVisible && (
        <Modal
          isVisible={isAddSubcategoryModalVisible}
          onClose={() => setIsAddSubcategoryModalVisible(false)}
        >
          <h3 className="mb-4 text-lg font-bold">Add Subcategory</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="block mb-2">Subcategory Name</label>
            <input
              type="text"
              value={newSubcategoryData.subcategoryName}
              onChange={(e) =>
                setNewSubcategoryData((prev) => ({
                  ...prev,
                  subcategoryName: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <label className="block mb-2">Description</label>
            <textarea
              value={newSubcategoryData.description}
              onChange={(e) =>
                setNewSubcategoryData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <label className="block mb-2">Select Category</label>
            <select
              value={newSubcategoryData.categoryId}
              onChange={(e) =>
                setNewSubcategoryData((prev) => ({
                  ...prev,
                  categoryId: Number(e.target.value),
                }))
              }
              className="w-full p-2 border rounded"
            >
              <option value={0}>Select Category</option>
              {categories?.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              onClick={handleAddSubcategory}
              className="px-4 py-2 mt-4 text-white rounded bg-primary"
            >
              Add Subcategory
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default Categories
