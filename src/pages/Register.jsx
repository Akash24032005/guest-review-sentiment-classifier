import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastProvider, toast } from '../components/ui/index'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Registered successfully! Please login.')
        navigate('/login')
      } else {
        toast.error(data.detail || 'Registration failed')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div>
      <ToastProvider />
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-blue-800 dark:text-white mb-6">Register</h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 font-semibold"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register