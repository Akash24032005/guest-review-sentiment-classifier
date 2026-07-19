import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Loader, ToastProvider, toast } from '../components/ui/index'

function Classify() {
  const [review, setReview] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleClassify = async () => {
    if (!review.trim()) {
      toast.error('Please enter a review!')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review })
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
        toast.success('Review classified!')
      } else {
        toast.error('Classification failed!')
      }
    } catch (err) {
      toast.error('Something went wrong!')
    }
    setLoading(false)
  }

  const sentimentColors = {
    positive: 'bg-green-100 text-green-700',
    neutral: 'bg-yellow-100 text-yellow-700',
    negative: 'bg-red-100 text-red-700'
  }

  return (
    <div>
      <ToastProvider />
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-800 dark:text-white mb-2">AI Review Classifier</h2>
        <p className="text-gray-500 mb-8">Paste a guest review to get sentiment, theme and suggested response.</p>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Paste guest review here..."
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 mb-4"
        />

        <button
          onClick={handleClassify}
          disabled={loading}
          className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold"
        >
          {loading ? 'Classifying...' : 'Analyze Review'}
        </button>

        {loading && (
          <div className="flex justify-center py-10">
            <Loader size="md" text="AI is analyzing..." />
          </div>
        )}

        {result && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-4">
            <div className="flex gap-4 flex-wrap">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${sentimentColors[result.sentiment]}`}>
                {result.sentiment}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                {result.theme}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Suggested Response:</p>
              <p className="text-gray-800 dark:text-white font-medium">{result.response}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Classify