import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import paths from '../../routes/paths'
import { useMerchantLogin } from '../../hooks/useMerchant'
import { useMerchantStore } from '../../store/useMerchantStore'

interface LoginValues {
  emailAddress: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setMerchant } = useMerchantStore()
  const [showPassword, setShowPassword] = useState(false)

  const { mutate: loginMerchant, isLoading } = useMerchantLogin()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const loginValue = useFormik<LoginValues>({
    initialValues: {
      emailAddress: '',
      password: '',
    },

    onSubmit: async () => {
      loginMerchant(
        {
          email: loginValue.values.emailAddress,
          pin: loginValue.values.password,
        },
        {
          onSuccess: (data) => {
            toast.success('Login successful!')
            navigate('/')
            setMerchant(data)
          },
          onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Login failed.')
          },
        }
      )
    },
  })

  return (
    <div className="flex items-center justify-center h-screen bg-dull_white">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-[#ffffff] max-w-3xl mx-auto rounded-md">
          <div className="px-4 py-6 md:px-10">
            <div className="flex flex-col mb-5 border rounded p-4">
              <h4 className="text-sm font-semibold">Sign in</h4>
              <p className="text-gray-500">
                Welcome back! Access your HalalNest store
              </p>
            </div>
            <div className="border rounded p-4">
              <form onSubmit={loginValue.handleSubmit}>
                <div className="flex flex-col text-left gap-x-5 gap-y-5">
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="w-full border px-5 py-3 focus:outline-none rounded-md"
                      id="emailAddress"
                      name="emailAddress"
                      value={loginValue.values.emailAddress}
                      onChange={loginValue.handleChange}
                      onBlur={loginValue.handleBlur}
                    />
                    {loginValue.touched.emailAddress &&
                    loginValue.errors.emailAddress ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {loginValue.errors.emailAddress}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="text-xs font-semibold">
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full border px-5 py-3 focus:outline-none rounded-md"
                        id="password"
                        name="password"
                        value={loginValue.values.password}
                        onChange={loginValue.handleChange}
                        onBlur={loginValue.handleBlur}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {loginValue.touched.password &&
                    loginValue.errors.password ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {loginValue.errors.password}
                      </p>
                    ) : null}
                    <div className="mt-1 flex justify-end">
                      <Link
                        to="/resetPassword"
                        className="text-sm font-semibold underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between w-full mt-5">
                  <button
                    className="flex items-center justify-center w-full px-4 py-3 text-xs font-semibold text-center text-white rounded bg-secondary"
                    type="submit"
                    disabled={isLoading}
                  >
                    Sign in
                  </button>
                  <p>
                    You dont have an account?{' '}
                    <Link
                      to={paths.signUp}
                      className="text-sm font-semibold underline mt-2"
                    >
                      Sign Up
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

export default Login
