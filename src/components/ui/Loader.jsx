/**
 * @param {Object} props
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {string} props.text - optional loading text
 */
function Loader({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className={`${sizes[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  )
}

export default Loader