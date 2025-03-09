/* eslint-disable no-unused-vars */
"use client"

import { motion } from "framer-motion"

export default function MainContent() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-black to-gray-900 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Welcome to Kishan Bhandary&apos;s Portfolio
      </motion.h1>

      <motion.div
        className="max-w-3xl w-full bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-gray-300 text-lg mb-4">
          This is where your main content would go. You can add your portfolio items, about section, contact
          information, or any other content you want to showcase.
        </p>

        <p className="text-gray-300 text-lg">
          The neon-style intro animation has completed, and now we&apos;re showing the main content with a different
          background music track.
        </p>
      </motion.div>
    </motion.div>
  )
}

