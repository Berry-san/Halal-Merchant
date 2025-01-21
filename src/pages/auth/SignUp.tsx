import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import paths from '../../routes/paths'
import { useRegisterMerchant } from '../../hooks/useMerchant'
import { useMerchantStore } from '../../store/useMerchantStore'
import Header from '../../components/organisms/Header'

interface SignupValues {
  names: string
  merchant_business_name: string
  gender: string
  address: string
  phonenumber: string
  emailAddress: string
  password: string
  confirmPassword: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const { setMerchant } = useMerchantStore()

  const { mutate: registerMerchant, isLoading } = useRegisterMerchant()

  const signupValues = useFormik<SignupValues>({
    initialValues: {
      names: '',
      merchant_business_name: '',
      gender: '',
      address: '',
      emailAddress: '',
      phonenumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      names: Yup.string().required('Full name is required'),
      merchant_business_name: Yup.string().required(
        'Business name is required'
      ),
      address: Yup.string().required('address is required'),
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
      registerMerchant(
        {
          names: signupValues.values.names,
          gender: signupValues.values.gender,
          email: signupValues.values.emailAddress,
          address: signupValues.values.address,
          phonenumber: signupValues.values.phonenumber,
          password: signupValues.values.password,
          merchant_business_name: signupValues.values.merchant_business_name,
        },
        {
          onSuccess: (data) => {
            if (data.active_status === 'active') {
              const merchantData = {
                email_address: data.email,
                names: data.names,
                merchant_business_name: data.merchant_business_name,
                merchantId: data.merchantId,
                gender: data.gender,
                email: data.email,
                address: data.address,
                bvn: data.bvn,
                phonenumber: data.phonenumber,
                providus_account_no: data.providus_account_no,
                user_type_id: data.user_type_id,
                isAuthenticated: true,
                active_status: data.active_status,
              }

              setMerchant(merchantData)
              toast.success('Signup successful!')
              navigate('/')
            } else {
              toast.error('Account is not active. Please contact support.')
            }
          },
          onError: (error: unknown) => {
            console.error(error)
            const message =
              error instanceof Error ? error.message : 'Signup failed'
            toast.error(message)
          },
        }
      )
    },
  })

  return (
    <>
      <Header sidebarOpen={false} sidebar={false} />
      <div className="flex items-center justify-center md:mt-20">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-md">
            <div className="px-4 py-6 md:px-10">
              <div className="flex flex-col p-4 mb-5 border rounded">
                <h4 className="text-sm font-semibold">Create an account</h4>
                <p className="text-gray-500">Setup your HalalNest store.</p>
              </div>
              <div className="p-4 border rounded">
                <form onSubmit={signupValues.handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full col-span-2 md:col-span-1">
                      <label htmlFor="names" className="text-xs font-semibold">
                        Full name:
                      </label>
                      <input
                        type="text"
                        id="names"
                        name="names"
                        value={signupValues.values.names}
                        onChange={signupValues.handleChange}
                        onBlur={signupValues.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      />
                      {signupValues.touched.names &&
                        signupValues.errors.names && (
                          <p className="mt-1 text-xs font-medium text-red-500">
                            {signupValues.errors.names}
                          </p>
                        )}
                    </div>

                    <div className="w-full col-span-2 md:col-span-1">
                      <label
                        htmlFor="merchant_business_name"
                        className="text-xs font-semibold"
                      >
                        Business name:
                      </label>
                      <input
                        type="text"
                        id="merchant_business_name"
                        name="merchant_business_name"
                        value={signupValues.values.merchant_business_name}
                        onChange={signupValues.handleChange}
                        onBlur={signupValues.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      />
                      {signupValues.touched.merchant_business_name &&
                        signupValues.errors.merchant_business_name && (
                          <p className="mt-1 text-xs font-medium text-red-500">
                            {signupValues.errors.merchant_business_name}
                          </p>
                        )}
                    </div>

                    <div className="w-full col-span-2 md:col-span-1">
                      <label
                        htmlFor="phonenumber"
                        className="text-xs font-semibold"
                      >
                        Gender:
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={signupValues.values.gender}
                        onChange={signupValues.handleChange}
                        onBlur={signupValues.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {signupValues.touched.gender &&
                        signupValues.errors.gender && (
                          <p className="mt-1 text-xs font-medium text-red-500">
                            {signupValues.errors.gender}
                          </p>
                        )}
                    </div>

                    <div className="w-full col-span-2 md:col-span-1">
                      <label
                        htmlFor="phonenumber"
                        className="text-xs font-semibold"
                      >
                        Phone Number:
                      </label>
                      <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={signupValues.values.phonenumber}
                        onChange={signupValues.handleChange}
                        onBlur={signupValues.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      />
                      {signupValues.touched.phonenumber &&
                        signupValues.errors.phonenumber && (
                          <p className="mt-1 text-xs font-medium text-red-500">
                            {signupValues.errors.phonenumber}
                          </p>
                        )}
                    </div>

                    <div className="w-full col-span-2 md:col-span-1">
                      <label
                        htmlFor="address"
                        className="text-xs font-semibold"
                      >
                        Address:
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={signupValues.values.address}
                        onChange={signupValues.handleChange}
                        onBlur={signupValues.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      />

                      {signupValues.touched.address &&
                        signupValues.errors.address && (
                          <p className="mt-1 text-xs font-medium text-red-500">
                            {signupValues.errors.address}
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
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      />
                      {signupValues.touched.emailAddress &&
                        signupValues.errors.emailAddress && (
                          <p className="mt-1 text-xs font-medium text-red-500">
                            {signupValues.errors.emailAddress}
                          </p>
                        )}
                    </div>

                    <div className="w-full col-span-2 md:col-span-1">
                      <label
                        htmlFor="password"
                        className="text-xs font-semibold"
                      >
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={signupValues.values.password}
                        onChange={signupValues.handleChange}
                        onBlur={signupValues.handleBlur}
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
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
                        className="w-full px-5 py-3 border rounded-md focus:outline-none"
                      />
                      {signupValues.touched.confirmPassword &&
                        signupValues.errors.confirmPassword && (
                          <p className="mt-1 text-xs font-medium text-red-500">
                            {signupValues.errors.confirmPassword}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between w-full mt-5 space-y-4 md:flex-row md:items-center md:space-y-0">
                    <button
                      className="flex items-center justify-center px-4 py-3 text-xs font-semibold text-center text-white rounded bg-secondary"
                      type="submit"
                      disabled={isLoading}
                    >
                      Create account
                    </button>
                    <p>
                      I already have an account.{' '}
                      <Link
                        to={paths.login}
                        className="mt-2 text-sm font-semibold underline"
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
    </>
  )
}

export default Signup
