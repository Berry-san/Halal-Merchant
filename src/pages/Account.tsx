import ProfileInfo from '../components/molecules/ProfileInfo'
import ReportProblem from '../components/molecules/ReportProblem'
import TabComponent from '../components/molecules/TabComponent'
import UpdatePassword from '../components/molecules/UpdatePassword'
import { useMerchantStore } from '../store/useMerchantStore'

const Account: React.FC = () => {
  const { merchant } = useMerchantStore()

  const getInitials = (fullName: string | undefined) => {
    if (!fullName) return ''
    const nameParts = fullName.trim().split(' ')
    return nameParts.map((part) => part[0]?.toUpperCase()).join('')
  }

  // Get initials of the merchant's name
  const initials = getInitials(merchant?.names)

  const tabContent = {
    'Update profile info': <ProfileInfo />,
    'Change password': <UpdatePassword />,
    'Report a problem': <ReportProblem />,
  }

  return (
    <div className="p-6 max-w-2xl text-gray-800">
      {/* User header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 mr-4">
          <span className="text-lg font-semibold text-black">{initials}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{merchant?.names}</h2>
          <p className="text-gray-500">{merchant?.phonenumber}, phone number</p>
        </div>
      </div>

      {/* Tabs */}
      <TabComponent tabContent={tabContent} />
    </div>
  )
}

export default Account
