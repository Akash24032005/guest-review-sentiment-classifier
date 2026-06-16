import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Login</h2>
        <p className="text-gray-600 mb-6">Staff login portal to access the Guest Review Classifier dashboard securely.</p>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-blue-500"
        />
        <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800">
          Login
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Login