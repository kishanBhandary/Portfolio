/* eslint-disable no-unused-vars */
"use client"

import { motion } from "framer-motion"
import "./TransitionAnimation.css"

export default function TransitionAnimation({ onComplete }) {
  return (
    <div className="transition-container">
      <motion.div
        className="portal-container"
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1, 10],
          opacity: [0, 1, 1],
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.3, 1],
          ease: "easeInOut",
        }}
        onAnimationComplete={onComplete}
      >
        <div className="portal-ring ring-1"></div>
        <div className="portal-ring ring-2"></div>
        <div className="portal-ring ring-3"></div>
        <div className="portal-center"></div>
      </motion.div>

      <motion.div
        className="transition-particles"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 6 + 2
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 100 + 50
          const duration = Math.random() * 1.5 + 0.5
          const delay = Math.random() * 0.5

          const x = Math.cos(angle) * distance
          const y = Math.sin(angle) * distance

          return (
            <motion.div
              key={i}
              className="portal-particle"
              style={{ width: size, height: size }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: x,
                y: y,
                opacity: [0, 1, 0],
                scale: [1, 1.5, 0.5],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

