function Hero() {
  return (
    <div className="bg-blue-50 dark:bg-gray-900 py-20 px-6 text-center">
      <h2 className="text-4xl font-bold text-blue-800 dark:text-white mb-4">
        Guest Review Sentiment Classifier
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Paste guest reviews from any platform and instantly get sentiment analysis, theme tags, and suggested responses — powered by AI.
      </p>
      <button className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800">
        Get Started
      </button>
    </div>
  )
}

export default Hero