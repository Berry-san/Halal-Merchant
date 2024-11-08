import { useState } from 'react'

// Define tab names
type TabName = 'Update profile info' | 'Change password' | 'Report a problem'

interface TabComponentProps {
  tabContent: Record<TabName, JSX.Element | null>
}

const TabComponent: React.FC<TabComponentProps> = ({ tabContent }) => {
  const [activeTab, setActiveTab] = useState<TabName>('Update profile info')

  return (
    <div>
      {/* Tab navigation */}
      <div className="border-b mb-4">
        <nav className="flex gap-6 text-gray-500">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabName)}
              className={`${
                activeTab === tab
                  ? 'text-black border-b-2 border-black font-semibold'
                  : 'hover:text-black'
              } pb-2 px-2`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">{tabContent[activeTab]}</div>
    </div>
  )
}

export default TabComponent
