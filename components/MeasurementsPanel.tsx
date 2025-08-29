'use client'

import { motion } from 'framer-motion'
import { usePlanner } from './PlannerContext'

const MeasurementsPanel = () => {
  const {
    distances,
    unit,
    setUnit,
    convertToDisplayUnit,
    getUnitLabel
  } = usePlanner()

  const measurementCards = [
    {
      title: 'Distance to Front',
      value: convertToDisplayUnit(distances.front).toFixed(1)
    },
    {
      title: 'Distance to Back',
      value: convertToDisplayUnit(distances.back).toFixed(1)
    },
    {
      title: 'Distance to Left',
      value: convertToDisplayUnit(distances.left).toFixed(1)
    },
    {
      title: 'Distance to Right',
      value: convertToDisplayUnit(distances.right).toFixed(1)
    }
  ]

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Flex container to pin ad to bottom */}
      <div className="flex flex-col h-full">
        {/* Measurements content - takes up available space */}
        <div className="flex-1">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-[#1E1F25] mb-1">Measurements</h2>
            <p className="text-gray-600 text-xs">Real-time calculations and distances</p>
          </div>

          {/* Unit Toggle */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setUnit('m')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                unit === 'm'
                  ? 'bg-[#3A7D66] text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Meters
            </button>
            <button
              onClick={() => setUnit('ft')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                unit === 'ft'
                  ? 'bg-[#3A7D66] text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Feet
            </button>
          </div>

          {/* Distance Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {measurementCards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-[#3A7D66]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-xs text-gray-500 mb-1">{card.title}</div>
                <div className="text-lg font-bold text-[#1E1F25]">
                  {card.value} {getUnitLabel()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ad box - pinned to bottom */}
        <div className="mt-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
            <div className="text-blue-600 text-sm font-medium mb-2">Advertisement Space</div>
            <div className="text-xs text-gray-500">
              Premium placement for relevant ads
            </div>
            <div className="mt-2 text-xs text-gray-400">
              300x250
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MeasurementsPanel
