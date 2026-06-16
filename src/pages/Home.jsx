import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Great hospitality!"
          description="The host was very welcoming and the food was amazing. Would definitely come back."
          tag="Host & Food"
          sentiment="positive"
        />
        <Card
          title="Average experience"
          description="Room was okay but cleanliness could be better. Location was nice though."
          tag="Cleanliness"
          sentiment="neutral"
        />
      </div>
      <Footer />
    </div>
  )
}

export default Home