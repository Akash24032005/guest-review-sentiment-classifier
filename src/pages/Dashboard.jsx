import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Loader, ToastProvider, toast } from '../components/ui/index'

function Dashboard() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data.data)
        setLoading(false)
        toast.success('Reviews loaded successfully!')
      })
      .catch(err => {
        toast.error('Failed to fetch reviews!')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <ToastProvider />
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-800 dark:text-white mb-8">Dashboard</h2>
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" text="Loading reviews..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl shadow">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Review</th>
                  <th className="px-4 py-3 text-left">Sentiment</th>
                  <th className="px-4 py-3 text-left">Theme</th>
                  <th className="px-4 py-3 text-left">Suggested Response</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                    <td className="px-4 py-3 text-sm">{review.id}</td>
                    <td className="px-4 py-3 text-sm">{review.text}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        review.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                        review.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {review.sentiment}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{review.theme}</td>
                    <td className="px-4 py-3 text-sm">{review.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard