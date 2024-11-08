// import Logout from 'Pages/Auth/Logout'
import { useState, useEffect } from 'react'
import hamburger from '../../assets/icons/hamburger.svg'
import halalLogo from '../../assets/images/halalLogo.png'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme) // Persist theme in localStorage
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <header className="sticky top-0 z-30 flex w-full bg-white border-b border-border_color drop-shadow-2">
      <div className="flex items-center justify-between flex-grow px-3 md:px-6 py-2.5 lg:h-16 shadow-2 2xl:px-11">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="items-center hidden pl-4 text-black lg:flex">
            <img src={halalLogo} className="w-12 h-12" alt="" />
            <p className="font-bold text-secondary">HalalNest Merchant</p>
          </div>
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
        </div>
      </div>
    </header>
  )
}

export default Header
