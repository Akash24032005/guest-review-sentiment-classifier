/**
 * @param {Object} props - Uses react-hot-toast library
 * Wrap your app with <Toaster /> and call toast('message') anywhere
 */
import { Toaster, toast } from 'react-hot-toast'

export { toast }

export function ToastProvider() {
  return <Toaster position="top-right" />
}

export default ToastProvider