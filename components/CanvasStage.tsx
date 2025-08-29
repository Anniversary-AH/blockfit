'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePlanner } from './PlannerContext'

const CanvasStage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { 
    lot, 
    house, 
    housePosition, 
    setHousePosition, 
    setDistances,
    unit,
    convertToDisplayUnit,
    getUnitLabel
  } = usePlanner()

  // Local dragging state
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate dimensions in pixels
    const maxFrontage = Math.max(lot.frontM, lot.backM)
    const maxSide = Math.max(lot.leftM, lot.rightM)
    const maxDimension = Math.max(maxFrontage, maxSide)

    // Calculate scale to fit the trapezoid nicely - ZOOM IN MORE
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Scale to fit with padding - INCREASED SCALE FOR MORE ZOOM
    const scale = Math.min(canvas.width / (maxDimension * 1.5), canvas.height / (maxDimension * 1.5), 12)

    // Calculate trapezoid points
    const frontagePixels = lot.frontM * scale
    const backPixels = lot.backM * scale
    const leftPixels = lot.leftM * scale
    const rightPixels = lot.rightM * scale

    const frontLeft = { x: centerX - frontagePixels / 2, y: centerY - leftPixels / 2 }
    const frontRight = { x: centerX + frontagePixels / 2, y: centerY - rightPixels / 2 }
    const backLeft = { x: centerX - backPixels / 2, y: centerY + leftPixels / 2 }
    const backRight = { x: centerX + backPixels / 2, y: centerY + rightPixels / 2 }

    // House dimensions in pixels
    const houseWidth = house.widthM * scale
    const houseLength = house.lengthM * scale

    // Calculate the center of the trapezoid for better initial positioning
    const trapezoidCenterX = (frontLeft.x + frontRight.x + backLeft.x + backRight.x) / 4
    const trapezoidCenterY = (frontLeft.y + frontRight.y + backLeft.y + backRight.y) / 4

    // Constrain house within the trapezoid bounds (simplified to rectangular AABB for now)
    const minX = Math.min(frontLeft.x, backLeft.x)
    const maxX = Math.max(frontRight.x, backRight.x)
    const minY = Math.min(frontLeft.y, frontRight.y)
    const maxY = Math.max(backLeft.y, backRight.y)

    let constrainedX = housePosition.x
    let constrainedY = housePosition.y

    // Check if house is at the default position (first load) and center it
    if (housePosition.x === 350 && housePosition.y === 250) {
      // Center the house in the trapezoid
      constrainedX = trapezoidCenterX - houseWidth / 2
      constrainedY = trapezoidCenterY - houseLength / 2
    }

    // Constrain to bounds
    constrainedX = Math.max(minX, Math.min(constrainedX, maxX - houseWidth))
    constrainedY = Math.max(minY, Math.min(constrainedY, maxY - houseLength))

    // Update house position in context if it was constrained or centered
    if (constrainedX !== housePosition.x || constrainedY !== housePosition.y) {
      setHousePosition({ x: constrainedX, y: constrainedY })
    }

    // Draw grid
    ctx.strokeStyle = '#ecf0f1' // Bone color for grid
    ctx.lineWidth = 1
    const gridSpacing = scale * 5 // 5m grid
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw block as proper trapezoid
    ctx.strokeStyle = '#1E1F25' // Charcoal
    ctx.lineWidth = 3
    ctx.fillStyle = '#F7F7F5' // Bone
    ctx.beginPath()
    ctx.moveTo(frontLeft.x, frontLeft.y)
    ctx.lineTo(frontRight.x, frontRight.y)
    ctx.lineTo(backRight.x, backRight.y)
    ctx.lineTo(backLeft.x, backLeft.y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw House
    ctx.fillStyle = '#C06C4C' // Terracotta
    ctx.fillRect(constrainedX, constrainedY, houseWidth, houseLength)
    ctx.strokeStyle = '#8B453A' // Darker Terracotta
    ctx.lineWidth = 2
    ctx.strokeRect(constrainedX, constrainedY, houseWidth, houseLength)

    // House label
    ctx.fillStyle = 'white'
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('HOUSE', constrainedX + houseWidth / 2, constrainedY + houseLength / 2 + 6)

    // House dimensions - POSITIONED BETTER TO AVOID OVERLAP
    ctx.fillStyle = '#1E1F25'
    ctx.font = 'bold 12px Arial'
    ctx.fillText(`${convertToDisplayUnit(house.widthM).toFixed(1)}${getUnitLabel()} wide`, constrainedX + houseWidth / 2, constrainedY - 8)

    ctx.save()
    ctx.translate(constrainedX - 15, constrainedY + houseLength / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(`${convertToDisplayUnit(house.lengthM).toFixed(1)}${getUnitLabel()} long`, 0, 0)
    ctx.restore()

    // Calculate dynamic offset based on block size
    const dynamicOffset = Math.max(30, maxDimension * scale * 0.1) // At least 30px, or 10% of block size

    // Calculate distances (like Excel cell calculations)
    const frontDist = Math.max(0, (constrainedY - frontLeft.y) / scale)
    const backDist = Math.max(0, (backLeft.y - constrainedY - houseLength) / scale)
    const leftDist = Math.max(0, (constrainedX - frontLeft.x) / scale)
    const rightDist = Math.max(0, (frontRight.x - constrainedX - houseWidth) / scale)

    // Update the context with calculated distances (like setting Excel cell values)
    setDistances({
      front: frontDist,
      back: backDist,
      left: leftDist,
      right: rightDist
    })

    // Draw measurement bars - IMPROVED POSITIONING WITH DYNAMIC OFFSET
    ctx.strokeStyle = '#3498db'
    ctx.lineWidth = 2
    ctx.fillStyle = '#3498db'
    ctx.font = 'bold 12px Arial'
    ctx.textAlign = 'center'

    // Front measurement (top) - POSITIONED TO THE RIGHT WITH DYNAMIC OFFSET
    if (frontDist > 0) {
      const y = frontLeft.y + (constrainedY - frontLeft.y) / 2
      ctx.beginPath()
      ctx.moveTo(maxX + dynamicOffset, frontLeft.y)
      ctx.lineTo(maxX + dynamicOffset, constrainedY)
      ctx.stroke()
      ctx.fillText(`${convertToDisplayUnit(frontDist).toFixed(1)}${getUnitLabel()}`, maxX + dynamicOffset + 25, y + 4)
    }

    // Back measurement (bottom) - POSITIONED TO THE RIGHT WITH DYNAMIC OFFSET
    if (backDist > 0) {
      const y = constrainedY + houseLength + (backLeft.y - constrainedY - houseLength) / 2
      ctx.beginPath()
      ctx.moveTo(maxX + dynamicOffset, constrainedY + houseLength)
      ctx.lineTo(maxX + dynamicOffset, backLeft.y)
      ctx.stroke()
      ctx.fillText(`${convertToDisplayUnit(backDist).toFixed(1)}${getUnitLabel()}`, maxX + dynamicOffset + 25, y + 4)
    }

    // Left measurement - POSITIONED ABOVE WITH DYNAMIC OFFSET
    if (leftDist > 0) {
      const x = frontLeft.x + (constrainedX - frontLeft.x) / 2
      ctx.beginPath()
      ctx.moveTo(frontLeft.x, minY - dynamicOffset)
      ctx.lineTo(constrainedX, minY - dynamicOffset)
      ctx.stroke()
      ctx.fillText(`${convertToDisplayUnit(leftDist).toFixed(1)}${getUnitLabel()}`, x, minY - dynamicOffset - 5)
    }

    // Right measurement - POSITIONED ABOVE WITH DYNAMIC OFFSET
    if (rightDist > 0) {
      const x = constrainedX + houseWidth + (frontRight.x - constrainedX - houseWidth) / 2
      ctx.beginPath()
      ctx.moveTo(constrainedX + houseWidth, minY - dynamicOffset)
      ctx.lineTo(frontRight.x, minY - dynamicOffset)
      ctx.stroke()
      ctx.fillText(`${convertToDisplayUnit(rightDist).toFixed(1)}${getUnitLabel()}`, x, minY - dynamicOffset - 5)
    }

    // Block labels - BETTER POSITIONING TO AVOID OVERLAP
    ctx.fillStyle = '#1E1F25'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'

    // Frontage label (top) - POSITIONED ABOVE THE BLOCK
    ctx.fillText(`Frontage: ${convertToDisplayUnit(lot.frontM).toFixed(1)}${getUnitLabel()}`, (frontLeft.x + frontRight.x) / 2, minY - 25)

    // Back label (bottom) - POSITIONED BELOW THE BLOCK
    ctx.fillText(`Back: ${convertToDisplayUnit(lot.backM).toFixed(1)}${getUnitLabel()}`, (backLeft.x + backRight.x) / 2, maxY + 25)

    // Left side label - POSITIONED TO THE LEFT
    ctx.save()
    ctx.translate(minX - 30, (frontLeft.y + backLeft.y) / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(`Left: ${convertToDisplayUnit(lot.leftM).toFixed(1)}${getUnitLabel()}`, 0, 0)
    ctx.restore()

    // Right side label - POSITIONED TO THE RIGHT
    ctx.save()
    ctx.translate(maxX + 30, (frontRight.y + backRight.y) / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(`Right: ${convertToDisplayUnit(lot.rightM).toFixed(1)}${getUnitLabel()}`, 0, 0)
    ctx.restore()

  }, [lot, house, housePosition, setHousePosition, setDistances, unit, convertToDisplayUnit, getUnitLabel])

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate scale for hit detection
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxFrontage = Math.max(lot.frontM, lot.backM)
    const maxSide = Math.max(lot.leftM, lot.rightM)
    const maxDimension = Math.max(maxFrontage, maxSide)
    const scale = Math.min(canvas.width / (maxDimension * 1.5), canvas.height / (maxDimension * 1.5), 12)
    
    const houseWidth = house.widthM * scale
    const houseLength = house.lengthM * scale

    // Check if clicking on house
    if (mouseX >= housePosition.x && mouseX <= housePosition.x + houseWidth &&
        mouseY >= housePosition.y && mouseY <= housePosition.y + houseLength) {
      setIsDragging(true)
      setDragOffset({
        x: mouseX - housePosition.x,
        y: mouseY - housePosition.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    setHousePosition({
      x: mouseX - dragOffset.x,
      y: mouseY - dragOffset.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling while dragging
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const touchX = touch.clientX - rect.left
    const touchY = touch.clientY - rect.top

    // Calculate scale for hit detection
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxFrontage = Math.max(lot.frontM, lot.backM)
    const maxSide = Math.max(lot.leftM, lot.rightM)
    const maxDimension = Math.max(maxFrontage, maxSide)
    const scale = Math.min(canvas.width / (maxDimension * 1.5), canvas.height / (maxDimension * 1.5), 12)
    
    const houseWidth = house.widthM * scale
    const houseLength = house.lengthM * scale

    // Check if touching on house
    if (touchX >= housePosition.x && touchX <= housePosition.x + houseWidth &&
        touchY >= housePosition.y && touchY <= housePosition.y + houseLength) {
      setIsDragging(true)
      setDragOffset({
        x: touchX - housePosition.x,
        y: touchY - housePosition.y
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    e.preventDefault() // Prevent scrolling while dragging
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const touchX = touch.clientX - rect.left
    const touchY = touch.clientY - rect.top

    setHousePosition({
      x: touchX - dragOffset.x,
      y: touchY - dragOffset.y
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={800} // Fixed width for now, can be made responsive
        height={600} // Fixed height for now, can be made responsive
        className="bg-white rounded-lg shadow-inner"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }} // Prevent default touch behaviors
      />
    </div>
  )
}

export default CanvasStage
