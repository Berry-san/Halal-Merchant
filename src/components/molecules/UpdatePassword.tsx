import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useUpdateMerchantDetails } from '../../hooks/useMerchant'
import InputField from '../atoms/InputField'
import { useMerchantStore } from '../../store/useMerchantStore'

const UpdatePassword = () => {
  const { merchant } = useMerchantStore()
  const {
    mutate: updatePassword,
    isLoading,
    isSuccess,
    isError,
  } = useUpdateMerchantDetails()

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: merchant?.email || '',
      pin: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      pin: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('pin')], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)

      updatePassword(
        { email: values.email, pin: values.pin },
        {
          onSuccess: () => {
            resetForm() // Clears form values on successful submission
          },
        }
      )
    },
    enableReinitialize: true,
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Old Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <InputField
            label="New Password"
            name="pin"
            type="password"
            value={formik.values.pin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pin && formik.errors.pin}
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white rounded bg-secondary"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
          {isSuccess && (
            <p className="mt-4 text-green-600">
              Password updated successfully!
            </p>
          )}
          {isError && (
            <p className="mt-4 text-red-600">Failed to update password.</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword
