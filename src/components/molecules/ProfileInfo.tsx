import { useFormik } from 'formik'
import { useUpdateMerchantDetails } from '../../hooks/useMerchant'
import InputField from '../atoms/InputField'
import { useMerchantStore } from '../../store/useMerchantStore'

const ProfileInfo = () => {
  const { merchant } = useMerchantStore()

  const {
    mutate: updateMerchantDetails,
    isLoading,
    isSuccess,
    isError,
  } = useUpdateMerchantDetails()

  const formik = useFormik({
    initialValues: {
      email: merchant?.email || '',
      merchant_business_name: '',
      phone_number: '',
    },
    onSubmit: (values) => {
      updateMerchantDetails(values)
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-gray-600">Business name:</label>
            <InputField
              type="text"
              name="merchant_business_name"
              placeholder="Current business name"
              value={formik.values.merchant_business_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.merchant_business_name &&
                formik.errors.merchant_business_name
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Phone number:</label>
            <InputField
              type="text"
              name="phone_number"
              placeholder="Current phone number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone_number && formik.errors.phone_number}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-black rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update personal info'}
          </button>
          {isSuccess && (
            <p className="mt-2 text-green-600">Info updated successfully!</p>
          )}
          {isError && (
            <p className="mt-2 text-red-600">Failed to update info.</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProfileInfo
