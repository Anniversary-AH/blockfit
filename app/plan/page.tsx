'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ControlsPanel from '../../components/ControlsPanel'
import CanvasStage from '../../components/CanvasStage'
import MeasurementsPanel from '../../components/MeasurementsPanel'
import DisclaimerFooter from '../../components/DisclaimerFooter'
import { PlannerProvider } from '../../components/PlannerContext'

const PlanPage = () => {
  const [activePanel, setActivePanel] = useState<'controls' | 'canvas' | 'measurements'>('canvas')

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <PlannerProvider>
      <div className="min-h-screen bg-[#F7F7F5]">
        {/* Header with Go Home button */}
        <div className="bg-white shadow-sm border-b relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg md:text-xl font-bold text-[#1E1F25]">Blockfit Planner</h1>
            <button
              onClick={handleGoHome}
              className="bg-[#3A7D66] text-white px-3 md:px-4 py-2 rounded-lg hover:bg-[#2f6a57] transition-colors text-sm font-medium shadow-md hover:shadow-lg cursor-pointer"
            >
              ← Go Home
            </button>
          </div>
        </div>

        {/* Mobile Panel Navigation */}
        <div className="md:hidden bg-white border-b">
          <div className="flex">
            <button
              onClick={() => setActivePanel('controls')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activePanel === 'controls'
                  ? 'bg-[#3A7D66] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Controls
            </button>
            <button
              onClick={() => setActivePanel('canvas')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activePanel === 'canvas'
                  ? 'bg-[#3A7D66] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Canvas
            </button>
            <button
              onClick={() => setActivePanel('measurements')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activePanel === 'measurements'
                  ? 'bg-[#3A7D66] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Measurements
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]">
          {/* Left Panel - Controls (Hidden on mobile unless active) */}
          <div className={`${activePanel === 'controls' ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white shadow-lg overflow-y-auto`}>
            <ControlsPanel />
          </div>

          {/* Center Panel - Canvas (Hidden on mobile unless active) */}
          <div className={`${activePanel === 'canvas' ? 'block' : 'hidden'} md:block flex-1 bg-[#F7F7F5] p-2 md:p-6`}>
            <CanvasStage />
          </div>

          {/* Right Panel - Measurements (Hidden on mobile unless active) */}
          <div className={`${activePanel === 'measurements' ? 'block' : 'hidden'} md:block w-full md:w-80 bg-[#F7F7F5] p-2 md:p-4`}>
            <MeasurementsPanel />
          </div>
        </div>

        <DisclaimerFooter />
      </div>
    </PlannerProvider>
  )
}

export default PlanPage
