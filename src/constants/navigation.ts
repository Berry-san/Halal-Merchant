import dashboardIcon from '../assets/icons/dashboardIcon.svg'
import accountIcon from '../assets/icons/accountIcon.svg'
import orderIcon from '../assets/icons/orderIcon.svg'
import productsIcon from '../assets/icons/productsIcon.svg'
import paths from '../routes/paths'

export const MerchantSidebarLinks = [
  {
    label: 'Dashboard',
    href: paths.dashboard,
    icon: dashboardIcon,
    id: 1,
  },
  {
    label: 'Orders',
    href: paths.orders,
    icon: orderIcon,
    id: 2,
  },
  {
    label: 'Product',
    href: paths.products,
    icon: productsIcon,
    id: 3,
  },
  {
    label: 'Categories',
    href: paths.categories,
    icon: accountIcon,
    id: 4,
  },
  {
    label: 'My Account',
    href: paths.account,
    icon: accountIcon,
    id: 5,
  },
]
