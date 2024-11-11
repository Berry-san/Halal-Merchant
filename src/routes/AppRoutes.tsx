import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/organisms/Layout'
import AddProduct from '../pages/AddProduct'
import Login from '../pages/auth/Login'
import SignUp from '../pages/auth/SignUp'
import Dashboard from '../pages/Dashboard'
import Products from '../pages/Products'
import paths from './paths'
import Orders from '../pages/Orders'
import Account from '../pages/Account'
import Categories from '../pages/Categories'
import TrackOrder from '../pages/TrackOrder'
import EditProduct from '../pages/EditProduct'
import { useMerchantStore } from '../store/useMerchantStore'

function AppRoutes() {
  const { merchant } = useMerchantStore()

  const authChecker = merchant?.isAuthenticated
  console.log(authChecker)
  console.log(merchant)

  return (
    <Routes>
      <Route
        path={paths.login}
        element={authChecker === true ? <Navigate replace to="/" /> : <Login />}
        // element={<Login />}
      />
      <Route path={paths.signUp} element={<SignUp />} />
      {/* <Route path={paths.forgotPassword} element={<ForgotPassword />} /> */}
      <Route path={paths.trackOrder} element={<TrackOrder />} />

      <Route path={paths.dashboard} element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path={paths.orders} element={<Orders />} />
        <Route path={paths.products} element={<Products />} />
        <Route path={paths.addProduct} element={<AddProduct />} />
        <Route path={paths.editProduct} element={<EditProduct />} />
        <Route path={paths.account} element={<Account />} />
        <Route path={paths.categories} element={<Categories />} />
      </Route>
      <Route index element={<Navigate to={paths.login} />} />
      {/* Optional catch-all route */}
      <Route
        path="*"
        element={
          <h1 className="flex items-center justify-center h-screen text-3xl font-bold">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  )
}

export default AppRoutes
