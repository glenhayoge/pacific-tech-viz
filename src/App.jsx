import { Header, Footer } from './components/layout'
import { InternetUsageChart, FourGCoverageChart, DigitalSkillsRadar, CybersecurityScatterPlot } from './components/charts'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Header />
        
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 space-y-8">
          <InternetUsageChart />
          <FourGCoverageChart />
          <DigitalSkillsRadar />
          <CybersecurityScatterPlot />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
