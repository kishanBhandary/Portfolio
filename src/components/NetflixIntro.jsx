"use client"

import { useState, useEffect } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import "./NetflixIntro.css"

export default function NetflixIntro({ name, onComplete }) {
  const [visibleLetters, setVisibleLetters] = useState(0)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // Start the letter animation after a short delay
    const startDelay = setTimeout(() => {
      const letterInterval = setInterval(() => {
        setVisibleLetters((prev) => {
          if (prev < name.length) {
            return prev + 1
          } else {
            clearInterval(letterInterval)

            // After all letters are shown, wait and then fade out
            setTimeout(() => {
              setShowIntro(false)

              // After fade out animation completes, call onComplete
              setTimeout(onComplete, 1000)
            }, 2000)

            return prev
          }
        })
      }, 150) // Time between each letter appearing

      return () => clearInterval(letterInterval)
    }, 1000)

    return () => clearTimeout(startDelay)
  }, [name, onComplete])

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="flex items-center justify-center h-screen w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <div className="flex">
              {name.split("").map((letter, index) => (
                <motion.div
                  key={index}
                  className={`neon-text ${letter === " " ? "w-6 sm:w-10" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={index < visibleLetters ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-1 neon-line"
              style={{
                width: `${(visibleLetters / name.length) * 100}%`,
                transition: "width 0.15s linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

