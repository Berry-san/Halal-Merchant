interface SwitchProps {
  isActive: boolean
  onToggle: () => void
}

const Switch: React.FC<SwitchProps> = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={() => onToggle()}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        isActive ? 'bg-secondary' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isActive ? 'translate-x-4' : ''
        }`}
      />
    </button>
  )
}

export default Switch
