'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Upload, Ruler, Maximize, ScanLine, ShieldCheck, Move3D } from 'lucide-react'
import AppHeader from '../components/AppHeader'

const HomePage = () => {
  const handleGetStarted = () => {
    // Navigation will be handled by Link component
  }

  const faqData = [
    {
      question: "What is BlockFit?",
      answer: "BlockFit helps you visualize and validate your plans before committing to them, saving time and resources."
    },
    {
      question: "How does it work?",
      answer: "Enter in the frontage, back, left, and right dimensions of the lot and the house dimensions. Then, the app will calculate the fit of the house on the lot."
    },
    {
      question: "Is BlockFit free to use?",
      answer: "Yes, BlockFit is free to use. We do have a small ad at the bottom of the page."
    },
    {
      question: "Can I tell my friends about BlockFit?",
      answer: "Yes, you can share the link to BlockFit with your friends and family."
    }
  ]

  const howItWorksData = [
    {
      icon: Upload,
      title: "Enter Dimensions",
      description: "Input your block measurements and house specifications to create a detailed summary"
    },
    {
      icon: Ruler,
      title: "Measure",
      description: "Use our precision tools to analyze dimensions and fit"
    },
    {
      icon: Maximize,
      title: "Dream Home",
      description: "Visualize your perfect home placement and optimize for maximum efficiency"
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <AppHeader />
      
      {/* Hero Section */}
      <motion.section 
        className="px-6 py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1E1F25] mb-6 leading-tight">
            See if your plan actually fits—before you fall in love.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get started with BlockFit to visualize and validate your plans before committing to them.
          </p>
          <Link
            href="/plan"
            className="inline-block bg-[#3A7D66] text-white px-8 py-4 rounded-xl hover:bg-[#2f6a57] transition-colors font-semibold text-lg"
            onClick={handleGetStarted}
            tabIndex={0}
            aria-label="Get Started with BlockFit"
          >
            Get Started
          </Link>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-[#1E1F25]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#3A7D66] rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#1E1F25]">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1E1F25] mb-4">
              Why Choose BlockFit?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get the insights you need to make confident decisions about your dream home
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3A7D66] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ScanLine className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1F25] mb-3">Clarity</h3>
                <p className="text-gray-600">
                  See exactly how your house fits your block.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3A7D66] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1F25] mb-3">Confidence</h3>
                <p className="text-gray-600">
                  Know your setbacks and clearances before you buy.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3A7D66] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Move3D className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1F25] mb-3">Control</h3>
                <p className="text-gray-600">
                  Experiment with sizes in minutes, not hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-[#1E1F25]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-8">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-200 pb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3 text-[#1E1F25]">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1F25] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 mb-4">
              Disclaimer: BlockFit is a planning reference tool only and may not reflect council or builder requirements.  
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Amber-Field. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://www.amber-field.com/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="https://www.amber-field.com/terms-of-service" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
