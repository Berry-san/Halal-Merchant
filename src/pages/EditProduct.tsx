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

  // Initialize Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: productDetails?.product_name || '',
      productShortName: productDetails?.short_product_name || '',
      productCategory: productDetails?.category_id || '',
      productSubCategory: productDetails?.sub_category_id || '',
      productDescription: productDetails?.product_description || '',
      productPrice: productDetails?.product_price || '',
      vat: productDetails?.vat || '',
      productDiscount: productDetails?.product_discount_percentage || '',
      productModel: productDetails?.product_model || '',
      productColor: productDetails?.product_color || '',
      productQuantity: productDetails?.product_quantity || '',
      expiryDate: productDetails?.expiry_date
        ? productDetails.expiry_date.split('T')[0]
        : '', // Format date to YYYY-MM-DD
    },
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append('product_name', values.productName || '')
      formData.append('short_product_name', values.productShortName || '')
      formData.append('product_price', String(values.productPrice || ''))
      formData.append('product_description', values.productDescription || '')
      formData.append('product_model', values.productModel || '')
      formData.append('product_color', values.productColor || '')
      formData.append('product_quantity', String(values.productQuantity || ''))
      formData.append('expiry_date', values.expiryDate || '')
      formData.append('category_id', values.productCategory || '')
      formData.append('sub_category_id', values.productSubCategory || '')
      formData.append(
        'product_discount_percentage',
        String(values.productDiscount || '')
      )
      formData.append('vat', String(values.vat || ''))

      updateProductMutation.mutate(
        { productId: productId!, updateData: formData },
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

  useEffect(() => {
    if (productDetails) {
      setSelectedCategoryId(productDetails.category_id)
      // Set the existing image URL for preview
      if (typeof productDetails.product_picture?.picture1 === 'string') {
        setImagePreview(productDetails.product_picture.picture1)
      }
    }
  }, [productDetails])

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
            <section className="col-span-5 p-4 border rounded lg:col-span-3">
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
                        value={formik.values.expiryDate}
                        onChange={formik.handleChange}
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

            <section className="col-span-2">
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
                  </label>
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
