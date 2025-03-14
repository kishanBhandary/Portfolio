/* eslint-disable no-unused-vars */
"use client"

import { motion } from "framer-motion"
import "./TransitionAnimation.css"

export default function TransitionAnimation({ onComplete }) {
  return (
    <div className="transition-container">
      {/* Cosmic wormhole effect */}
      <motion.div
        className="wormhole-container"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 10],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          times: [0, 0.3, 1],
          ease: "easeInOut",
        }}
        onAnimationComplete={onComplete}
      >
        {/* Wormhole rings */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="wormhole-ring"
            style={{
              width: `${(i + 1) * 12}%`,
              height: `${(i + 1) * 12}%`,
              borderWidth: `${4 - i * 0.4}px`,
              opacity: 1 - i * 0.1,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 8 - i,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              },
              scale: {
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          />
        ))}

        {/* Center energy core */}
        <motion.div
          className="wormhole-core"
          animate={{
            boxShadow: [
              "0 0 20px 5px rgba(184, 41, 255, 0.7), 0 0 40px 10px rgba(112, 0, 255, 0.5)",
              "0 0 40px 10px rgba(184, 41, 255, 0.9), 0 0 80px 20px rgba(112, 0, 255, 0.7)",
              "0 0 20px 5px rgba(184, 41, 255, 0.7), 0 0 40px 10px rgba(112, 0, 255, 0.5)",
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Energy particles */}
      <div className="energy-particles">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 4 + 2
          const duration = Math.random() * 2 + 1
          const delay = Math.random() * 1

          return (
            <motion.div
              key={i}
              className="energy-particle"
              style={{
                width: size,
                height: size,
                left: `${50}%`,
                top: `${50}%`,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * window.innerWidth * 1.5],
                y: [0, (Math.random() - 0.5) * window.innerHeight * 1.5],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut",
              }}
            />
          )
        })}
      </div>

      {/* Light streaks */}
      <div className="light-streaks">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * 360
          const length = 50 + Math.random() * 50
          const width = 1 + Math.random() * 3
          const delay = i * 0.05

          return (
            <motion.div
              key={i}
              className="light-streak"
              style={{
                height: width,
                transform: `rotate(${angle}deg)`,
              }}
              initial={{
                width: 0,
                opacity: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                width: [0, length, 0],
                opacity: [0, 0.7, 0],
                x: "-50%",
                y: "-50%",
              }}
              transition={{
                duration: 2,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      {/* Cosmic dust */}
      <motion.div
        className="cosmic-dust"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3 }}
      />
    </div>
  )
}

