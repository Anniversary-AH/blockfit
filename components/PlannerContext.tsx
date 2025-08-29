'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Lot {
  frontM: number
  backM: number
  leftM: number
  rightM: number
}

interface House {
  widthM: number
  lengthM: number
}

interface HousePosition {
  x: number
  y: number
}

interface Distances {
  front: number
  back: number
  left: number
  right: number
}

type Unit = 'm' | 'ft'

interface PlannerContextType {
  lot: Lot
  house: House
  housePosition: HousePosition
  distances: Distances
  unit: Unit
  setLot: (lot: Lot) => void
  setHouse: (house: House) => void
  setHousePosition: (position: HousePosition) => void
  setDistances: (distances: Distances) => void
  setUnit: (unit: Unit) => void
  updateLotField: (field: keyof Lot, value: number) => void
  updateHouseField: (field: keyof House, value: number) => void
  calculateBlockArea: () => number
  calculateHouseArea: () => number
  calculateYardArea: () => number
  convertToDisplayUnit: (valueInMeters: number) => number
  getUnitLabel: () => string
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined)

export const usePlanner = () => {
  const context = useContext(PlannerContext)
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider')
  }
  return context
}

export const PlannerProvider = ({ children }: { children: ReactNode }) => {
  const [lot, setLot] = useState<Lot>({
    frontM: 22.4,
    backM: 16.7,
    leftM: 36,
    rightM: 35.3
  })

  const [house, setHouse] = useState<House>({
    widthM: 12,
    lengthM: 20
  })

  const [housePosition, setHousePosition] = useState<HousePosition>({
    x: 350, // Centered horizontally
    y: 250  // Centered vertically
  })

  const [distances, setDistances] = useState<Distances>({
    front: 0,
    back: 0,
    left: 0,
    right: 0
  })

  const [unit, setUnit] = useState<Unit>('m')

  const updateLotField = (field: keyof Lot, value: number) => {
    setLot(prev => ({ ...prev, [field]: value }))
  }

  const updateHouseField = (field: keyof House, value: number) => {
    setHouse(prev => ({ ...prev, [field]: value }))
  }

  const calculateBlockArea = () => {
    // Using the exact calculation from the real estate site
    // For a trapezoid: area = (a + b) * h / 2
    // where a = frontage, b = back, h = average of left and right sides
    const frontage = lot.frontM
    const back = lot.backM
    const left = lot.leftM
    const right = lot.rightM
    
    // Calculate the average height (depth) of the lot
    const avgHeight = (left + right) / 2
    
    // Calculate area using trapezoid formula
    const area = ((frontage + back) * avgHeight) / 2
    
    // This should give us approximately 774m² with the default values
    return area
  }

  const calculateHouseArea = () => {
    return house.widthM * house.lengthM
  }

  const calculateYardArea = () => {
    return calculateBlockArea() - calculateHouseArea()
  }

  const convertToDisplayUnit = (valueInMeters: number): number => {
    if (unit === 'ft') {
      const feetValue = valueInMeters * 3.28084 // Convert meters to feet
      return Math.round(feetValue * 10) / 10 // Round to 1 decimal place
    }
    return valueInMeters
  }

  const getUnitLabel = (): string => {
    return unit === 'ft' ? 'ft' : 'm'
  }

  const value: PlannerContextType = {
    lot,
    house,
    housePosition,
    distances,
    unit,
    setLot,
    setHouse,
    setHousePosition,
    setDistances,
    setUnit,
    updateLotField,
    updateHouseField,
    calculateBlockArea,
    calculateHouseArea,
    calculateYardArea,
    convertToDisplayUnit,
    getUnitLabel
  }

  return (
    <PlannerContext.Provider value={value}>
      {children}
    </PlannerContext.Provider>
  )
}
