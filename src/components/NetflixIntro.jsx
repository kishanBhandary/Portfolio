/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import "./NetflixIntro.css"

export default function NetflixIntro({ name, onComplete }) {
  const [showIntro, setShowIntro] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0) // 0: initial, 1: particles, 2: letters
  const [animationComplete, setAnimationComplete] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const backgroundControls = useAnimation()
  const particlesControls = useAnimation()

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

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Start with particle formation
      setAnimationPhase(1)

      // After particles form, show letters
      setTimeout(() => {
        setAnimationPhase(2)
      }, 3000)
    }

    sequence()
  }, [])

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

  // Create particles for the name formation
  const nameParticles = Array.from({ length: 150 }).map((_, i) => {
    const size = Math.random() * 3 + 1
    const initialX = (Math.random() - 0.5) * window.innerWidth
    const initialY = (Math.random() - 0.5) * window.innerHeight
    const delay = Math.random() * 2

    return (
      <motion.div
        key={i}
        className="name-particle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        initial={{
          x: initialX,
          y: initialY,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: [0, 0.8, 0],
          scale: [1, 1.5, 0.5],
        }}
        transition={{
          duration: 3,
          delay: delay,
          ease: "easeInOut",
        }}
      />
    )
  })

  // Background particles
  const backgroundParticles = Array.from({ length: 50 }).map((_, i) => {
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
    hidden: (i) => ({
      opacity: 0,
      y: 0,
      scale: 0,
      filter: "blur(20px)",
      rotateY: 90,
    }),
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateY: 0,
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

  // Energy wave animation
  const waveVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: [0, 1.5],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 2,
        ease: "easeOut",
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

          {backgroundParticles}

          <div className="intro-content">
            {/* Energy wave effect */}
            {animationPhase >= 1 && (
              <motion.div
                className="energy-wave"
                variants={waveVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
              />
            )}

            {/* Particle formation effect */}
            {animationPhase >= 1 && <div className="name-particles-container">{nameParticles}</div>}

            {/* Main letter animation */}
            {animationPhase >= 2 && (
              <motion.div
                className="name-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onAnimationComplete={index === name.length - 1 ? handleFinalLetterComplete : undefined}
                    data-text={letter}
                  >
                    {letter}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Progress bar */}
            {animationPhase >= 2 && (
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
            )}

            {/* Welcome message */}
            {animationPhase >= 2 && (
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
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

