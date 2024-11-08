import React from 'react'

interface ButtonProps {
  text: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 text-white dark:text-black rounded-lg w-44 bg-black dark:bg-white ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
