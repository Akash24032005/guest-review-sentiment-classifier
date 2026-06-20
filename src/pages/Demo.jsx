import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input, Modal, Loader, ToastProvider, toast } from '../components/ui/index'

function Demo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')

  return (
    <div>
      <ToastProvider />
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-10">

        <h2 className="text-3xl font-bold text-blue-800">Component Library Demo</h2>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="md">Primary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="outline" size="md">Outline</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Input</h3>
          <Input
            label="Guest Review"
            placeholder="Paste your review here..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Input
            label="Error State"
            placeholder="Enter email..."
            error="This field is required"
          />
        </div>

        {/* Modal */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Modal</h3>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Review Details"
          >
            <p className="text-gray-600">This is a sample modal showing review details. Press Escape or click ✕ to close.</p>
          </Modal>
        </div>

        {/* Toast */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Toast</h3>
          <div className="flex gap-4">
            <Button variant="primary" onClick={() => toast.success('Review classified successfully!')}>Success Toast</Button>
            <Button variant="outline" onClick={() => toast.error('Something went wrong!')}>Error Toast</Button>
          </div>
        </div>

        {/* Loader */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Loader</h3>
          <div className="flex gap-8 items-center">
            <Loader size="sm" text="Small" />
            <Loader size="md" text="Medium" />
            <Loader size="lg" text="Large" />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Demo