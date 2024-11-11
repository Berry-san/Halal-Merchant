import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from '../components/atoms/InputField'
import TextAreaField from '../components/atoms/TextAreaField'
import {
  useAllCategories,
  useSubcategoriesByCategoryId,
} from '../hooks/useCategory'
import { useMutation } from 'react-query'
import { productService } from '../api/productService'
import { Category, Subcategory } from '../shared.types'

const AddProduct = () => {
  const { data: categories } = useAllCategories()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    ''
  )

  // Fetch subcategories based on selected category
  const { data: subcategories } = useSubcategoriesByCategoryId(
    selectedCategoryId as number
  )

  // State for storing the uploaded file
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
    }
  }

  const addProductMutation = useMutation((formData: FormData) =>
    productService.addProduct(formData)
  )

  const formik = useFormik({
    initialValues: {
      productName: '',
      shortProductName: '',
      productCategory: '',
      productSubCategory: '',
      productDescription: '',
      productPrice: '',
      vat: '',
      productDiscount: '',
      productModel: '',
      productColor: '',
      productQuantity: '',
      expiryDate: '',
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product Name is required'),
      shortProductName: Yup.string().required('Short Name is required'),
      productCategory: Yup.string().required('Category is required'),
      productSubCategory: Yup.string().required('Subcategory is required'),
      productDescription: Yup.string().required('Description is required'),
      productPrice: Yup.number().required('Price is required').positive(),
      vat: Yup.number().required('VAT is required').positive(),
      productDiscount: Yup.number().required('Discount is required').positive(),
      productModel: Yup.string().required('Model is required'),
      productColor: Yup.string().required('Color is required'),
      productQuantity: Yup.number().required('Quantity is required').positive(),
      expiryDate: Yup.date().required('Expiry Date is required').nullable(),
    }),
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append('productName', values.productName)
      formData.append('shortProductName', values.shortProductName)
      formData.append('productPrice', values.productPrice)
      formData.append('productDescription', values.productDescription)
      formData.append('productModel', values.productModel)
      formData.append('productColor', values.productColor)
      formData.append('productQuantity', values.productQuantity)
      formData.append('expiryDate', values.expiryDate)
      formData.append('categoryId', values.productCategory)
      formData.append('subCategoryId', values.productSubCategory)
      formData.append('productDiscountPercentage', values.productDiscount)
      formData.append('vat', values.vat)
      if (uploadedImage) {
        formData.append('productPictures', uploadedImage)
      }

      // Send FormData directly
      addProductMutation.mutate(formData)
    },
    // onSubmit: (values) => {
    //   const productData: AddProductRequest = {
    //     productName: values.productName,
    //     shortProductName: values.shortProductName,
    //     productPrice: parseFloat(values.productPrice),
    //     productDescription: values.productDescription,
    //     productModel: values.productModel,
    //     productColor: values.productColor,
    //     productQuantity: values.productQuantity,
    //     productPictures: uploadedImage!,
    //     expiryDate: new Date(values.expiryDate),
    //     categoryId: parseInt(values.productCategory),
    //     subCategoryId: parseInt(values.productSubCategory),
    //     merchantId: 1, // Replace with dynamic merchant ID if needed
    //     productDiscountPercentage: parseFloat(values.productDiscount),
    //     vat: parseFloat(values.vat),
    //   }

    //   addProductMutation.mutate(productData)
    // },
  })

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategoryId(categories[0].category_id)
    }
  }, [categories])

  return (
    <div>
      <h2>Product Information</h2>
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
                    name="shortProductName"
                    value={formik.values.shortProductName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.shortProductName &&
                      formik.errors.shortProductName
                    }
                  />
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="productCategory" className="text-gray-500">
                      Product Category:
                    </label>
                    <select
                      name="productCategory"
                      value={formik.values.productCategory}
                      onChange={(e) => {
                        setSelectedCategoryId(e.target.value)
                        formik.setFieldValue('productCategory', e.target.value)
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
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full"
                >
                  {uploadedImage ? (
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Uploaded Preview"
                      className="object-fill w-full h-64 rounded-lg"
                    />
                  ) : null}
                  <p className="w-full py-4 mt-2 text-center text-gray-500 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {uploadedImage
                      ? 'Change Product Image'
                      : 'Upload Product Image'}
                  </p>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </section>
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-5 text-white bg-black rounded-md"
        >
          {addProductMutation.isLoading ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct