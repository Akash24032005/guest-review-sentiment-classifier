/**
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.disabled
 * @param {function} props.onClick
 * @param {React.ReactNode} props.children
 */
function Button({ variant = 'primary', size = 'md', disabled = false, onClick, children }) {
  const base = 'rounded-lg font-semibold transition-all duration-200 focus:outline-none'

  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}

export default Button