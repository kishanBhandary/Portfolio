/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import "./CustomCursor.css"

export default function CustomCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Use spring for smoother motion
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  const trailRef = useRef([])
  const requestRef = useRef()

  // Update cursor position with requestAnimationFrame for smoother performance
  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
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
      cancelAnimationFrame(requestRef.current)
    }
  }, [cursorX, cursorY])

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

  // Only render on client-side
  if (typeof window === "undefined") return null

  return (
    <div className={`cursor-container ${isVisible ? "visible" : "hidden"}`}>
      {/* Main cursor */}
      <motion.div
        className="cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isClicking ? 0.8 : cursorVariant === "link" ? 1.5 : 1,
          opacity: isClicking ? 0.8 : 1,
        }}
      >
        <div className="cursor-ring"></div>
        <div className="cursor-dot"></div>
      </motion.div>

      {/* Simplified cursor trail - only 5 elements for better performance */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          className="cursor-trail"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            opacity: 0.7 - index * 0.15,
            scale: 0.8 - index * 0.15,
            filter: `blur(${index * 0.5}px)`,
            transition: `all ${index * 0.05 + 0.05}s linear`,
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
            left: cursorX.get(),
            top: cursorY.get(),
          }}
        />
      )}
    </div>
  )
}

