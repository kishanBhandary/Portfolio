/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./NetflixIntro.css"

export default function NetflixIntro({ name, onComplete }) {
  const [showIntro, setShowIntro] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // After animation completes, wait and then fade out
    if (animationComplete) {
      const timeout = setTimeout(() => {
        setShowIntro(false)

        // After fade out animation completes, call onComplete
        setTimeout(onComplete, 1000)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [animationComplete, onComplete])

  // Calculate when all letters have finished animating
  const handleAnimationComplete = (index) => {
    if (index === name.length - 1) {
      setAnimationComplete(true)
    }
  }

  // Generate random values for each letter's animation
  const getRandomDirection = () => {
    const directions = ["top", "bottom", "left", "right"]
    return directions[Math.floor(Math.random() * directions.length)]
  }

  // Create animation variants based on random direction
  const createVariants = (direction) => {
    const offScreen = {
      top: { y: "-100vh", x: 0, rotate: -10, opacity: 0 },
      bottom: { y: "100vh", x: 0, rotate: 10, opacity: 0 },
      left: { x: "-100vw", y: 0, rotate: -10, opacity: 0 },
      right: { x: "100vw", y: 0, rotate: 10, opacity: 0 },
    }

    return {
      initial: offScreen[direction],
      animate: {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        filter: [
          "blur(10px) brightness(2)",
          "blur(0px) brightness(1.5)",
          "blur(4px) brightness(2)",
          "blur(0px) brightness(1.5)",
        ],
      },
      transition: {
        type: "spring",
        damping: 12,
        duration: 0.8,
        delay: Math.random() * 0.5,
        filter: {
          times: [0, 0.3, 0.4, 1],
          duration: 0.8,
        },
      },
    }
  }

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
            <div className="flex flex-wrap justify-center max-w-4xl">
              {name.split("").map((letter, index) => {
                const direction = getRandomDirection()
                const { initial, animate, transition } = createVariants(direction)

                return (
                  <motion.div
                    key={index}
                    className={`neon-text ${letter === " " ? "w-6 sm:w-10" : ""} m-1`}
                    initial={initial}
                    animate={animate}
                    transition={{
                      ...transition,
                      delay: index * 0.1, // Sequential timing
                    }}
                    onAnimationComplete={() => handleAnimationComplete(index)}
                  >
                    {letter}
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              className="mt-8 h-1 neon-line"
              initial={{ width: 0 }}
              animate={{ width: animationComplete ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

