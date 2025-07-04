import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Pacific Connectivity 2050
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A data-driven visualization showcasing technology access, digital skills, and connectivity across Pacific Island nations
          </p>
          <div className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
            Blue Pacific 2050 – Technology & Connectivity
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📈 Internet Usage Over Time</h3>
            <p className="text-gray-300">Track internet adoption per country (2000–2024)</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📊 4G Coverage Snapshot</h3>
            <p className="text-gray-300">Rank countries by mobile network access</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🕸️ Digital Skills Radar</h3>
            <p className="text-gray-300">Compare digital literacy across nations</p>
          </div>
        </main>

        <div className="text-center">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Development Counter: {count}
          </button>
          <p className="mt-4 text-gray-400">
            Click to test the counter while building the visualization components
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
