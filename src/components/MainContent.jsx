/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion"
import "./MainContent.css"

export default function MainContent() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const controls = useAnimation()

  // Parallax effect values based on scroll
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Smooth scroll progress
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Hide scroll indicator when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  // Generate stars for the background
  const stars = Array.from({ length: 100 }).map((_, i) => {
    const size = Math.random() * 2 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    const animationDuration = Math.random() * 3 + 2
    const delay = Math.random() * 2

    return (
      <div
        key={i}
        className="star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}%`,
          top: `${y}%`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    )
  })

  // Project data
  const projects = [
    {
      id: 1,
      title: "AI-Powered Analytics Dashboard",
      description: "A real-time analytics platform with AI-driven insights and predictive modeling capabilities.",
      tags: ["React", "TensorFlow.js", "D3.js", "Node.js"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      title: "Immersive VR Experience",
      description: "A virtual reality application that creates interactive and educational experiences for users.",
      tags: ["Three.js", "WebXR", "React", "GLSL"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 3,
      title: "Blockchain Secure Messaging",
      description: "End-to-end encrypted messaging platform built on blockchain technology for maximum security.",
      tags: ["Solidity", "Web3.js", "React", "Node.js"],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Skills data
  const skills = [
    { name: "Frontend Development", level: 90, color: "#b829ff" },
    { name: "Backend Development", level: 85, color: "#7000ff" },
    { name: "AI & Machine Learning", level: 80, color: "#ffcc00" },
    { name: "UI/UX Design", level: 75, color: "#ff9900" },
    { name: "DevOps & Cloud", level: 70, color: "#b829ff" },
  ]

  return (
    <div className="portfolio-container">
      {/* Subtle star background */}
      <div className="stars-container">{stars}</div>

      {/* Hero section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        ref={containerRef}
      >
        <div className="hero-content">
          <motion.div
            className="profile-container"
            style={{
              transform: `perspective(1200px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
            }}
          >
            {/* Profile image with glow effect */}
            <motion.div
              className="profile-image-container"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(184, 41, 255, 0.3)",
                  "0 0 40px rgba(184, 41, 255, 0.5)",
                  "0 0 20px rgba(184, 41, 255, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <img src="/robot-human-ai.png" alt="Kishan Bhandary" className="profile-image" />
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1>Kishan Bhandary</h1>
            <h2>AI & Full Stack Developer</h2>
            <p>
              Crafting innovative digital experiences at the intersection of human creativity and artificial
              intelligence.
            </p>

            <div className="hero-buttons">
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        {showScrollIndicator && (
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="mouse">
              <motion.div
                className="wheel"
                animate={{
                  y: [0, 10, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </div>
            <motion.div
              className="scroll-text"
              animate={{
                y: [0, 5, 0],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: 0.2,
              }}
            >
              Scroll Down
            </motion.div>
          </motion.div>
        )}
      </motion.section>

      {/* About section */}
      <motion.section
        id="about"
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>About Me</h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate developer with expertise in creating cutting-edge applications that leverage the power of
              artificial intelligence and modern web technologies. With over 5 years of experience in the industry, I've
              worked on a diverse range of projects from immersive web experiences to complex AI systems.
            </p>

            <p>
              My approach combines technical excellence with creative problem-solving, allowing me to build solutions
              that are not only functional but also intuitive and engaging for users.
            </p>

            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
          </div>

          <div className="skills-container">
            <h3>My Skills</h3>

            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects section */}
      <motion.section
        id="projects"
        className="projects-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>My Projects</h2>
          <div className="section-divider"></div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 30px rgba(184, 41, 255, 0.2)",
              }}
            >
              <div className="project-image">
                <img src={project.image || "/placeholder.svg"} alt={project.title} />
                <div className="project-overlay">
                  <motion.button className="view-project-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    View Project
                  </motion.button>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="view-all-container" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a href="#" className="view-all-btn">
            View All Projects
          </a>
        </motion.div>
      </motion.section>

      {/* Contact section */}
      <motion.section
        id="contact"
        className="contact-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>Get In Touch</h2>
          <div className="section-divider"></div>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>
              I'm currently available for freelance work or full-time positions. If you have a project that needs some
              creative touch, I'd love to hear about it.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon email-icon"></div>
                <span>kishan.bhandary@example.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon location-icon"></div>
                <span>San Francisco, CA</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon phone-icon"></div>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="social-links">
              <motion.a
                href="#"
                className="social-link github"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.a>
              <motion.a
                href="#"
                className="social-link linkedin"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.a>
              <motion.a
                href="#"
                className="social-link twitter"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.a>
              <motion.a
                href="#"
                className="social-link instagram"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" id="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" id="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Kishan Bhandary. All Rights Reserved.</p>
          <p>Designed & Built with ❤️</p>
        </div>
      </footer>
    </div>
  )
}

