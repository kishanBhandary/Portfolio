/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "./CustomCursor.css"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trailPositions, setTrailPositions] = useState([])

  // Update mouse position
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add current position to trail with timestamp
      setTrailPositions((prev) => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY, time: Date.now() }]
        // Keep only the last 10 positions
        return newPositions.slice(-10)
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Set cursor to visible if mouse is already in window
    if (typeof document !== "undefined") {
      setIsVisible(document.hasFocus())
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Handle hover states for interactive elements
  useEffect(() => {
    const handleLinkHover = () => setCursorVariant("link")
    const handleLinkLeave = () => setCursorVariant("default")

    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  // Cursor variants for different states
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    link: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
    },
  }

  // Click animation
  const clickAnimation = {
    scale: isClicking ? 0.8 : 1,
    opacity: isClicking ? 0.8 : 1,
  }

  // Calculate trail positions with delay
  const getTrailPosition = (index) => {
    const position = trailPositions[trailPositions.length - 1 - index]
    if (!position) return { x: mousePosition.x, y: mousePosition.y }
    return { x: position.x, y: position.y }
  }

  // Only render on client-side
  if (typeof window === "undefined") return null

  return (
    <div className={`cursor-container ${isVisible ? "visible" : "hidden"}`}>
      {/* Main cursor */}
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        style={{
          ...clickAnimation,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="cursor-ring"></div>
        <div className="cursor-dot"></div>
      </motion.div>

      {/* Cursor trail */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          className="cursor-trail"
          style={{
            left: getTrailPosition(index).x,
            top: getTrailPosition(index).y,
            opacity: 1 - index * 0.1,
            scale: 1 - index * 0.1,
          }}
          transition={{
            type: "tween",
            ease: "linear",
            duration: 0,
          }}
        />
      ))}

      {/* Click effect */}
      {isClicking && (
        <motion.div
          className="click-effect"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      )}
    </div>
  )
}

