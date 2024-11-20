import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import InputField from '../components/atoms/InputField'
import TextAreaField from '../components/atoms/TextAreaField'
import {
  useAllCategories,
  useSubcategoriesByCategoryId,
} from '../hooks/useCategory'
import { useProductDetails, useUpdateProduct } from '../hooks/useProducts'
import { Category, Subcategory } from '../shared.types'
import BackButton from '../components/atoms/BackButton'
import { getProductImageURL } from '../utils/getProductImageURL'
// import { useMerchantStore } from '../store/useMerchantStore'

const EditProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()

  const { data: categories } = useAllCategories()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    ''
  )
  const { data: productDetails, isLoading: loadingProduct } = useProductDetails(
    Number(productId)
  )
  const { data: subcategories } = useSubcategoriesByCategoryId(
    selectedCategoryId as number
  )
  const updateProductMutation = useUpdateProduct()

  // Image preview state
  const [imagePreview, setImagePreview] = useState<string | undefined>()
  const [newImage, setNewImage] = useState<File | null>(null)

  // Handle new image selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewImage(file)
      setImagePreview(URL.createObjectURL(file)) // Update preview
    }
  }

  useEffect(() => {
    if (productDetails) {
      setSelectedCategoryId(productDetails.category_id)
      // Set the existing image URL for preview if no new image is selected
      if (!newImage)
        setImagePreview(getProductImageURL(productDetails.product_picture))
    }
  }, [productDetails, newImage])

  // Initialize Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: productDetails?.product_name || '',
      productShortName: productDetails?.short_product_name || '',
      merchantId: productDetails?.merchant_id || '',
      productCategory: productDetails?.category_id || '',
      productSubCategory: productDetails?.sub_category_id || '',
      productDescription: productDetails?.product_description || '',
      productPrice: productDetails?.product_price || '',
      vat: productDetails?.vat || '',
      productDiscount: productDetails?.product_discount_percentage || '',
      productId: productDetails?.product_id || '',
      productModel: productDetails?.product_model || '',
      productColor: productDetails?.product_color || '',
      productQuantity: productDetails?.product_quantity || '',
      status: productDetails?.status || '',
      expiryDate: productDetails?.expiry_date
        ? productDetails.expiry_date.split('T')[0]
        : '', // Format date to YYYY-MM-DD
    },
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append('productName', values.productName || '')
      formData.append('shortProductName', values.productShortName || '')
      formData.append('merchantId', values.merchantId || '')
      formData.append('productPrice', String(values.productPrice || ''))
      formData.append('productDescription', values.productDescription || '')
      formData.append('productModel', values.productModel || '')
      formData.append('productColor', values.productColor || '')
      formData.append('productQuantity', String(values.productQuantity || ''))
      formData.append('expiryDate', values.expiryDate || '')
      formData.append('categoryId', values.productCategory || '')
      formData.append('subCategoryId', values.productSubCategory || '')
      formData.append(
        'productDiscountPercentage',
        String(values.productDiscount || '')
      )
      formData.append('vat', String(values.vat || ''))
      formData.append('status', values.status || '')
      formData.append('productId', String(values.productId) || '')

      // Append new image if selected
      if (newImage) {
        formData.append('productPictures', newImage)
      }

      updateProductMutation.mutate(
        { updateData: formData },
        {
          onSuccess: () => {
            toast.success('Product updated successfully!')
            navigate('/products') // Navigate only on success
          },
          onError: (error) => {
            console.error('Failed to update product:', error)
          },
        }
      )
    },
  })

  return (
    <div>
      <div className="flex space-x-4">
        <BackButton />
        <h2 className="text-xl font-bold">Edit Product</h2>
      </div>
      {loadingProduct ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-5 gap-5 mt-2">
            <section className="order-1 col-span-5 lg:col-span-2 lg:order-2">
              <div className="p-4 border rounded">
                <h3>Product Image</h3>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Product Image"
                        className="object-fill w-full h-64 rounded-lg"
                      />
                    )}
                    <p className="w-full py-4 mt-2 text-center text-gray-500 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      {newImage ? 'Change Image' : 'Upload New Image'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </section>
            <section className="order-2 col-span-5 p-4 border rounded lg:col-span-3 lg:order-1">
              <h3>General Information</h3>
              <div className="mt-2">
                <div className="flex flex-col gap-5 space-y-5">
                  <section>
                    <InputField
                      label="Product Name"
                      name="productName"
                      value={formik.values.productName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.productName && formik.errors.productName
                      }
                    />
                    <InputField
                      label="Product Short Name"
                      name="productShortName"
                      value={formik.values.productShortName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.productShortName &&
                        formik.errors.productShortName
                      }
                    />
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="productCategory"
                        className="text-gray-500"
                      >
                        Product Category:
                      </label>
                      <select
                        name="productCategory"
                        value={formik.values.productCategory}
                        onChange={(e) => {
                          setSelectedCategoryId(e.target.value)
                          formik.setFieldValue(
                            'productCategory',
                            e.target.value
                          )
                        }}
                        onBlur={formik.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      >
                        <option value="">Select a category</option>
                        {categories?.map((category: Category) => (
                          <option
                            key={category.category_id}
                            value={category.category_id}
                          >
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.productCategory &&
                        formik.errors.productCategory && (
                          <div className="text-red-600">
                            {formik.errors.productCategory}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="productSubCategory"
                        className="text-gray-500"
                      >
                        Product Sub-Category:
                      </label>
                      <select
                        name="productSubCategory"
                        value={formik.values.productSubCategory}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      >
                        <option value="">Select a sub-category</option>
                        {subcategories?.map((sub: Subcategory) => (
                          <option
                            key={sub.subcategory_id}
                            value={sub.subcategory_id}
                          >
                            {sub.subcategory_name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.productSubCategory &&
                        formik.errors.productSubCategory && (
                          <div className="text-red-600">
                            {formik.errors.productSubCategory}
                          </div>
                        )}
                    </div>

                    <TextAreaField
                      label="Product Description"
                      name="productDescription"
                      value={formik.values.productDescription}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.productDescription &&
                        formik.errors.productDescription
                      }
                      rows={5}
                    />
                  </section>

                  <section>
                    <h3>Price Information</h3>
                    <div className="grid grid-cols-2 gap-5 mt-2">
                      <InputField
                        label="Product Price"
                        name="productPrice"
                        value={formik.values.productPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.productPrice &&
                          formik.errors.productPrice
                        }
                      />
                      <InputField
                        label="VAT"
                        name="vat"
                        value={formik.values.vat}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.vat && formik.errors.vat}
                      />
                      <InputField
                        label="Product Discount"
                        name="productDiscount"
                        value={formik.values.productDiscount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.productDiscount &&
                          formik.errors.productDiscount
                        }
                      />
                      <InputField
                        label="Product Model"
                        name="productModel"
                        value={formik.values.productModel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.productModel &&
                          formik.errors.productModel
                        }
                      />
                      <InputField
                        label="Product Color"
                        name="productColor"
                        value={formik.values.productColor}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.productColor &&
                          formik.errors.productColor
                        }
                      />
                      <InputField
                        label="Product Quantity"
                        name="productQuantity"
                        value={formik.values.productQuantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.productQuantity &&
                          formik.errors.productQuantity
                        }
                      />
                      <InputField
                        label="Expiry Date"
                        name="expiryDate"
                        type="date"
                        value={
                          formik.values.expiryDate
                            ? new Date(formik.values.expiryDate)
                                .toISOString()
                                .split('T')[0]
                            : ''
                        }
                        onChange={(e) => {
                          const formattedDate = e.target.value // This is already in 'yyyy-mm-dd' format
                          formik.setFieldValue('expiryDate', formattedDate)
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.expiryDate && formik.errors.expiryDate
                        }
                      />
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>

          <button
            type="submit"
            className="px-4 py-2 mt-5 text-white bg-black rounded-md"
          >
            {updateProductMutation.isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      )}
    </div>
  )
}

export default EditProduct
