// import Logout from 'Pages/Auth/Logout'
import hamburger from '../../assets/icons/hamburger.svg'
import profileIcon from '../../assets/icons/profileIcon.svg'
import halalLogo from '../../assets/images/halalLogo.png'
import { useMerchantStore } from '../../store/useMerchantStore'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { merchant } = useMerchantStore()

  // const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  // useEffect(() => {
  //   document.documentElement.classList.remove('light', 'dark')
  //   document.documentElement.classList.add(theme)
  //   localStorage.setItem('theme', theme) // Persist theme in localStorage
  // }, [theme])

  return (
    <header className="sticky top-0 z-30 flex w-full bg-white border-b border-border_color drop-shadow-2">
      <div className="flex items-center justify-between flex-grow px-3 md:px-6 py-2.5 lg:h-16 shadow-2 2xl:px-11">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="items-center hidden pl-4 text-black lg:flex">
            <img src={halalLogo} className="w-12 h-12" alt="" />
            <p className="font-bold text-secondary">HalalNest Merchant</p>
          </div>

          {merchant && (
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation()
                setSidebarOpen(!sidebarOpen)
              }}
              className="z-40 block bg-white p-1.5 lg:hidden"
            >
              <img src={hamburger} className="w-8 h-8" alt="" />
            </button>
          )}
        </div>
        {merchant && (
          <div className="items-center justify-center hidden lg:flex">
            <span className="flex items-center justify-center w-12 h-12 mr-4 bg-gray-100 rounded-full">
              <img src={profileIcon} className="w-6 h-6" alt="User" />
            </span>
            <span className="">
              <span className="block text-sm font-medium text-black ">
                {merchant?.names}
              </span>
              <span className="block text-xs uppercase">
                {merchant?.merchant_business_name}
              </span>
            </span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
