// components/LogoutButton.tsx
import logoutIcon from '../../assets/icons/logoutIcon.svg'
import { useNavigate } from 'react-router-dom'
import { useMerchantStore } from '../../store/useMerchantStore'

const LogoutButton: React.FC = () => {
  const logout = useMerchantStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login') // Redirect to login page after logout
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center font-semibold px-4 py-2 text-[#F33A6A] rounded gap-5"
    >
      <img src={logoutIcon} alt="" className="w-6" />
      Logout
    </button>
  )
}

export default LogoutButton
