import React from 'react'
import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
  label?: string
  className?: string
  onClick?: () => void
}

const BackButton: React.FC<BackButtonProps> = ({
  label,
  className = '',
  onClick,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        inline-flex items-center 
        ${className}
      `}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

export default BackButton
