import { useState } from 'react'
import { Header, Footer } from './components/layout'
import { InternetUsageChart, FourGCoverageChart, DigitalSkillsRadar, CybersecurityScatterPlot } from './components/charts'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <InternetUsageChart />
          <FourGCoverageChart />
          <DigitalSkillsRadar />
          <CybersecurityScatterPlot />
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

        <Footer />
      </div>
    </div>
  )
}

export default App
