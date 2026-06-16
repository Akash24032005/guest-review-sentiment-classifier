import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Guest Review Classifier</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar