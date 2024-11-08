import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import paths from '../../routes/paths'

interface SignupValues {
  fullName: string
  businessName: string
  location: string
  emailAddress: string
  password: string
  confirmPassword: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const signupValues = useFormik<SignupValues>({
    initialValues: {
      fullName: '',
      businessName: '',
      location: 'Abuja',
      emailAddress: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      businessName: Yup.string().required('Business name is required'),
      location: Yup.string().required('Location is required'),
      emailAddress: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async () => {
      setLoading(true)

      // Implement the signup logic here, such as sending data to an API
      // Example:
      // try {
      //   const response = await apiService.userSignup(signupValues.values)
      //   if (response.status === 201) {
      //     toast.success('Account created successfully!')
      //     navigate('/login')
      //   } else {
      //     toast.error('Failed to create account')
      //   }
      // } catch (error) {
      //   toast.error('An error occurred')
      // } finally {
      //   setLoading(false)
      // }
    },
  })

  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white max-w-3xl mx-auto rounded-md md:mt-20">
          <div className="px-4 py-6 md:px-10">
            <div className="flex flex-col mb-5 border rounded p-4">
              <h4 className="text-sm font-semibold">Create an account</h4>
              <p className="text-gray-500">Setup your HalalNest store.</p>
            </div>
            <div className="border rounded p-4">
              <form onSubmit={signupValues.handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full col-span-2 md:col-span-1">
                    <label htmlFor="fullName" className="text-xs font-semibold">
                      Full name:
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={signupValues.values.fullName}
                      onChange={signupValues.handleChange}
                      onBlur={signupValues.handleBlur}
                      className="w-full border px-5 py-3 focus:outline-none rounded-md"
                    />
                    {signupValues.touched.fullName &&
                      signupValues.errors.fullName && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {signupValues.errors.fullName}
                        </p>
                      )}
                  </div>

                  <div className="w-full col-span-2 md:col-span-1">
                    <label
                      htmlFor="businessName"
                      className="text-xs font-semibold"
                    >
                      Business name:
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={signupValues.values.businessName}
                      onChange={signupValues.handleChange}
                      onBlur={signupValues.handleBlur}
                      className="w-full border px-5 py-3 focus:outline-none rounded-md"
                    />
                    {signupValues.touched.businessName &&
                      signupValues.errors.businessName && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {signupValues.errors.businessName}
                        </p>
                      )}
                  </div>

                  <div className="w-full col-span-2 md:col-span-1">
                    <label htmlFor="location" className="text-xs font-semibold">
                      Location:
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={signupValues.values.location}
                      onChange={signupValues.handleChange}
                      onBlur={signupValues.handleBlur}
                      className="w-full border px-5 py-3 focus:outline-none rounded-md"
                    >
                      <option value="Abuja">Abuja</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Kano">Kano</option>
                      {/* Add more options as needed */}
                    </select>
                    {signupValues.touched.location &&
                      signupValues.errors.location && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {signupValues.errors.location}
                        </p>
                      )}
                  </div>

                  <div className="w-full col-span-2 md:col-span-1">
                    <label
                      htmlFor="emailAddress"
                      className="text-xs font-semibold"
                    >
                      Email address:
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      value={signupValues.values.emailAddress}
                      onChange={signupValues.handleChange}
                      onBlur={signupValues.handleBlur}
                      className="w-full border px-5 py-3 focus:outline-none rounded-md"
                    />
                    {signupValues.touched.emailAddress &&
                      signupValues.errors.emailAddress && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {signupValues.errors.emailAddress}
                        </p>
                      )}
                  </div>

                  <div className="w-full  col-span-2 md:col-span-1">
                    <label htmlFor="password" className="text-xs font-semibold">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={signupValues.values.password}
                      onChange={signupValues.handleChange}
                      onBlur={signupValues.handleBlur}
                      className="w-full border px-5 py-3 focus:outline-none rounded-md"
                    />
                    {signupValues.touched.password &&
                      signupValues.errors.password && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {signupValues.errors.password}
                        </p>
                      )}
                  </div>

                  <div className="w-full col-span-2 md:col-span-1">
                    <label
                      htmlFor="confirmPassword"
                      className="text-xs font-semibold"
                    >
                      Confirm password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={signupValues.values.confirmPassword}
                      onChange={signupValues.handleChange}
                      onBlur={signupValues.handleBlur}
                      className="w-full border px-5 py-3 focus:outline-none rounded-md"
                    />
                    {signupValues.touched.confirmPassword &&
                      signupValues.errors.confirmPassword && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {signupValues.errors.confirmPassword}
                        </p>
                      )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between w-full mt-5 space-y-4 md:space-y-0">
                  <button
                    className="flex items-center justify-center px-4 py-3 text-xs font-semibold text-center text-white rounded bg-secondary"
                    type="submit"
                    disabled={loading}
                  >
                    Create account
                  </button>
                  <p>
                    I already have an account.{' '}
                    <Link
                      to={paths.login}
                      className="text-sm font-semibold underline mt-2"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Signup
