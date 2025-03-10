/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import "./NetflixIntro.css"

export default function NetflixIntro({ name, onComplete }) {
  const [showIntro, setShowIntro] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const backgroundControls = useAnimation()

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - left - width / 2) / 25
        const y = (e.clientY - top - height / 2) / 25
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Background animation
  useEffect(() => {
    const animateBackground = async () => {
      await backgroundControls.start({
        background: [
          "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(30,0,50,0.5) 100%)",
          "radial-gradient(circle at 30% 70%, rgba(0,0,0,1) 0%, rgba(60,0,100,0.5) 100%)",
          "radial-gradient(circle at 70% 30%, rgba(0,0,0,1) 0%, rgba(30,0,50,0.5) 100%)",
          "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(30,0,50,0.5) 100%)",
        ],
        transition: {
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        },
      })
    }

    animateBackground()
  }, [backgroundControls])

  // Handle completion of animation
  useEffect(() => {
    if (animationComplete) {
      const timeout = setTimeout(() => {
        setShowIntro(false)
        setTimeout(onComplete, 1000)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [animationComplete, onComplete])

  // Track when all letters have finished animating
  const handleFinalLetterComplete = () => {
    setAnimationComplete(true)
  }

  // Create particles for background effect
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 4 + 1
    const duration = Math.random() * 20 + 10
    const x = Math.random() * 100
    const y = Math.random() * 100
    const delay = Math.random() * 5

    return (
      <div
        key={i}
        className="particle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}%`,
          top: `${y}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    )
  })

  // Create staggered animation for letters
  const letterVariants = {
    initial: {
      y: -100,
      x: 0,
      rotateX: 90,
      opacity: 0,
      scale: 0.1,
    },
    animate: (i) => ({
      y: 0,
      x: 0,
      rotateX: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.1,
        duration: 1.5,
      },
    }),
    hover: {
      y: -10,
      scale: 1.1,
      textShadow: [
        "0 0 5px #b829ff, 0 0 10px #b829ff, 0 0 20px #b829ff, 0 0 40px #7000ff, 0 0 80px #7000ff",
        "0 0 7px #ffcc00, 0 0 14px #ffcc00, 0 0 28px #ffcc00, 0 0 56px #ff9900, 0 0 112px #ff9900",
        "0 0 5px #b829ff, 0 0 10px #b829ff, 0 0 20px #b829ff, 0 0 40px #7000ff, 0 0 80px #7000ff",
      ],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        textShadow: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        },
      },
    },
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="intro-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          ref={containerRef}
        >
          <motion.div className="background-gradient" animate={backgroundControls} />

          {particles}

          <div className="intro-content">
            <motion.div
              className="name-container"
              style={{
                perspective: 1000,
                transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              }}
            >
              {name.split("").map((letter, index) => (
                <motion.div
                  key={index}
                  className={`neon-text ${letter === " " ? "w-6 sm:w-10" : ""}`}
                  custom={index}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  onAnimationComplete={index === name.length - 1 ? handleFinalLetterComplete : undefined}
                  data-text={letter}
                >
                  {letter}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="progress-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationComplete ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="neon-line"
                initial={{ width: 0 }}
                animate={{ width: animationComplete ? "100%" : "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              className="intro-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animationComplete ? 1 : 0,
                y: animationComplete ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span>Welcome to the experience</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

