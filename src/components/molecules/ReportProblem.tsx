import { useFormik } from 'formik'
import { useMerchantStore } from '../../store/useMerchantStore'
import { useMerchantComplaint } from '../../hooks/useMerchant'
import InputField from '../atoms/InputField'
import TextAreaField from '../atoms/TextAreaField'

const ReportProblem = () => {
  const { merchant } = useMerchantStore()
  const {
    mutate: submitComplaint,
    isLoading,
    isSuccess,
    isError,
  } = useMerchantComplaint()

  // Initialize Formik with subject and message as values to be updated
  const formik = useFormik({
    initialValues: {
      email: merchant?.email || '',
      merchant_name: merchant?.names || '',
      merchantId: merchant?.merchant_id || '',
      subject: '',
      message: '',
    },
    // validationSchema,
    onSubmit: (values, { resetForm }) => {
      submitComplaint(values, {
        onSuccess: () => {
          resetForm() // Clears form values on successful submission
        },
      })
    },
    enableReinitialize: true, // Ensures that Formik updates initialValues if merchant changes
  })

  return (
    <div className="max-w-md">
      {/* <h2 className="text-2xl font-semibold">Send Complaint</h2> */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Subject"
          name="subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.subject && formik.errors.subject}
        />
        <TextAreaField
          label="Message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && formik.errors.message}
        />
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white rounded bg-secondary"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {isSuccess && (
          <p className="mt-4 text-green-600">Complaint sent successfully!</p>
        )}
        {isError && (
          <p className="mt-4 text-red-600">Failed to send complaint.</p>
        )}
      </form>
    </div>
  )
}

export default ReportProblem
