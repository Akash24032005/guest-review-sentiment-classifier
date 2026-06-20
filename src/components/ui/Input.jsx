/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.placeholder
 * @param {string} props.type
 * @param {string} props.value
 * @param {function} props.onChange
 * @param {string} props.error
 */
function Input({ label, placeholder, type = 'text', value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  )
}

export default Input