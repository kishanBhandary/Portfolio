/* eslint-disable no-unused-vars */
"use client"

import { motion } from "framer-motion"
import "./TransitionAnimation.css"

export default function TransitionAnimation({ onComplete }) {
  return (
    <div className="transition-container">
      {/* Portal effect */}
      <motion.div
        className="portal-container"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1.5, 10],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.2, 0.7, 1],
          ease: "easeInOut",
        }}
        onAnimationComplete={onComplete}
      >
        {/* Portal rings */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="portal-ring"
            style={{
              width: `${(i + 1) * 10}%`,
              height: `${(i + 1) * 10}%`,
              borderWidth: `${5 - i * 0.4}px`,
              opacity: 1 - i * 0.08,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 10 - i,
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
          className="portal-core"
          animate={{
            boxShadow: [
              "0 0 30px 10px rgba(255, 51, 102, 0.8), 0 0 60px 15px rgba(108, 99, 255, 0.6)",
              "0 0 60px 15px rgba(255, 51, 102, 1), 0 0 100px 30px rgba(108, 99, 255, 0.8)",
              "0 0 30px 10px rgba(255, 51, 102, 0.8), 0 0 60px 15px rgba(108, 99, 255, 0.6)",
            ],
            scale: [1, 1.3, 1],
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
        {Array.from({ length: 150 }).map((_, i) => {
          const size = Math.random() * 6 + 2
          const duration = Math.random() * 2 + 1
          const delay = Math.random() * 1.5

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
                x: [0, (Math.random() - 0.5) * window.innerWidth * 2],
                y: [0, (Math.random() - 0.5) * window.innerHeight * 2],
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
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * 360
          const length = 70 + Math.random() * 80
          const width = 1 + Math.random() * 4
          const delay = i * 0.03

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
                opacity: [0, 0.8, 0],
                x: "-50%",
                y: "-50%",
              }}
              transition={{
                duration: 2.5,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      {/* Digital glitch effect */}
      <motion.div
        className="digital-glitch"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.8, 0],
          x: ["-50%", "-50%"],
          y: ["-50%", "-50%"],
        }}
        transition={{
          duration: 3,
          times: [0, 0.5, 1],
        }}
      >
        <div className="glitch-text">LOADING</div>
      </motion.div>

      {/* Vignette overlay */}
      <div className="vignette-overlay"></div>
    </div>
  )
}

