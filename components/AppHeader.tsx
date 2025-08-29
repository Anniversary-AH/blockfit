'use client'

import Link from 'next/link'

const AppHeader = () => {
  const handleLaunchPlanner = () => {
    // Navigation will be handled by Link component
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold text-[#3A7D66] hover:text-[#2f6a57] transition-colors"
          tabIndex={0}
          aria-label="BlockFit Home"
        >
          BlockFit
        </Link>
      </div>
      
      <div className="flex items-center">
        <Link
          href="/plan"
          className="bg-[#3A7D66] text-white px-6 py-2 rounded-xl hover:bg-[#2f6a57] transition-colors font-medium"
          onClick={handleLaunchPlanner}
          tabIndex={0}
          aria-label="Launch Planner"
        >
          Launch Planner
        </Link>
      </div>
    </header>
  )
}

export default AppHeader
