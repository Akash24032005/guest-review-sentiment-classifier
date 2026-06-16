import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Login</h2>
        <p className="text-gray-600">Staff login portal to access the Guest Review Classifier dashboard securely.</p>
      </div>
      <Footer />
    </div>
  )
}

export default Login