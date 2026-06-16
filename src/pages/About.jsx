import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">About</h2>
        <p className="text-gray-600">This tool helps Trishul Eco-Homestays analyze guest reviews from multiple platforms using AI-powered sentiment classification and theme tagging.</p>
      </div>
      <Footer />
    </div>
  )
}

export default About