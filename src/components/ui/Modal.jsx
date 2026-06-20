/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 */
import { useEffect } from 'react'

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal