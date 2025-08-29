'use client'

import Link from 'next/link'

const DisclaimerFooter = () => {
  return (
    <footer className="px-6 py-8 bg-[#1E1F25] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-4">
            BlockFit is a planning tool for visualization purposes only. Always consult with qualified professionals for actual construction and compliance requirements.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Terms of Service"
            >
              Terms of Service
            </Link>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
            All rights reserved. © 2025 Amber-Field. 
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default DisclaimerFooter
