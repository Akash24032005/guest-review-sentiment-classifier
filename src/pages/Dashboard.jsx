import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Dashboard</h2>
        <p className="text-gray-600">View and manage all classified guest reviews, sentiment trends, and theme breakdowns from a single place.</p>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard