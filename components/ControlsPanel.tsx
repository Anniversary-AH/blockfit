'use client'

import { motion } from 'framer-motion'
import { usePlanner } from './PlannerContext'

const ControlsPanel = () => {
  const {
    lot,
    house,
    unit,
    convertToDisplayUnit,
    getUnitLabel,
    updateLotField,
    updateHouseField
  } = usePlanner()

  // Convert input values to display units
  const displayLot = {
    frontM: convertToDisplayUnit(lot.frontM),
    backM: convertToDisplayUnit(lot.backM),
    leftM: convertToDisplayUnit(lot.leftM),
    rightM: convertToDisplayUnit(lot.rightM)
  }

  const displayHouse = {
    widthM: convertToDisplayUnit(house.widthM),
    lengthM: convertToDisplayUnit(house.lengthM)
  }

  // Handle input changes - convert back to meters for storage
  const handleLotChange = (field: keyof typeof lot, value: number) => {
    const valueInMeters = unit === 'ft' ? value / 3.28084 : value
    updateLotField(field, valueInMeters)
  }

  const handleHouseChange = (field: keyof typeof house, value: number) => {
    const valueInMeters = unit === 'ft' ? value / 3.28084 : value
    updateHouseField(field, valueInMeters)
  }

  const inputFields = [
    {
      label: `Block Frontage (${getUnitLabel()})`,
      value: displayLot.frontM,
      field: 'frontM' as keyof typeof lot
    },
    {
      label: `Block Back (${getUnitLabel()})`,
      value: displayLot.backM,
      field: 'backM' as keyof typeof lot
    },
    {
      label: `Block Left Side (${getUnitLabel()})`,
      value: displayLot.leftM,
      field: 'leftM' as keyof typeof lot
    },
    {
      label: `Block Right Side (${getUnitLabel()})`,
      value: displayLot.rightM,
      field: 'rightM' as keyof typeof lot
    },
    {
      label: `House Length (${getUnitLabel()})`,
      value: displayHouse.lengthM,
      field: 'lengthM' as keyof typeof house
    },
    {
      label: `House Width (${getUnitLabel()})`,
      value: displayHouse.widthM,
      field: 'widthM' as keyof typeof house
    }
  ]

  return (
    <motion.div
      className="p-4 space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#1E1F25] mb-1">Block & House Controls</h2>
        <p className="text-gray-600 text-xs">Adjust dimensions and see real-time updates</p>
      </div>

      {/* Input Fields - Compact Layout */}
      <div className="space-y-3">
        {inputFields.map((field, index) => (
          <motion.div
            key={index}
            className="space-y-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <label className="text-xs font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0
                if (field.field in lot) {
                  handleLotChange(field.field as keyof typeof lot, value)
                } else {
                  handleHouseChange(field.field as keyof typeof house, value)
                }
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A7D66] focus:border-transparent"
              min="0"
              step="0.1"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ControlsPanel
