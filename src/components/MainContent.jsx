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
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Calculate mouse parallax values
  const calculateParallax = (depth = 10) => {
    if (typeof window === "undefined") return { x: 0, y: 0 }

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const x = (mousePosition.x - centerX) / depth
    const y = (mousePosition.y - centerY) / depth

    return { x, y }
  }

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
    { name: "Frontend Development", level: 90 },
    { name: "Backend Development", level: 85 },
    { name: "AI & Machine Learning", level: 80 },
    { name: "UI/UX Design", level: 75 },
    { name: "DevOps & Cloud", level: 70 },
  ]

  return (
    <div className="portfolio-container">
      {/* Parallax background elements */}
      <div className="parallax-bg">
        <motion.div
          className="parallax-shape shape1"
          style={{
            x: calculateParallax(15).x,
            y: calculateParallax(15).y,
          }}
        />
        <motion.div
          className="parallax-shape shape2"
          style={{
            x: calculateParallax(25).x,
            y: calculateParallax(25).y,
          }}
        />
        <motion.div
          className="parallax-shape shape3"
          style={{
            x: calculateParallax(20).x,
            y: calculateParallax(20).y,
          }}
        />
        <motion.div
          className="parallax-shape shape4"
          style={{
            x: calculateParallax(30).x,
            y: calculateParallax(30).y,
          }}
        />
        <motion.div
          className="parallax-shape shape5"
          style={{
            x: calculateParallax(10).x,
            y: calculateParallax(10).y,
          }}
        />
        <motion.div
          className="parallax-shape shape6"
          style={{
            x: calculateParallax(35).x,
            y: calculateParallax(35).y,
          }}
        />

        {/* Floating elements */}
        <motion.div
          className="floating-element element1"
          style={{
            x: calculateParallax(8).x,
            y: calculateParallax(8).y,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="floating-element element2"
          style={{
            x: calculateParallax(12).x,
            y: calculateParallax(12).y,
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, -8, 0, 8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="floating-element element3"
          style={{
            x: calculateParallax(6).x,
            y: calculateParallax(6).y,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

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
            className="hero-left"
            style={{
              x: calculateParallax(30).x,
              y: calculateParallax(30).y,
            }}
          >
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Kishan Bhandary
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI & Full Stack Developer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crafting innovative digital experiences at the intersection of human creativity and artificial
              intelligence.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
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
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-right"
            style={{
              x: calculateParallax(-20).x,
              y: calculateParallax(-20).y,
            }}
          >
            <div className="profile-image-wrapper">
              <motion.div
                className="profile-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <img src="/robot-human-ai.png" alt="Kishan Bhandary" className="profile-image" />
                <div className="image-overlay"></div>
              </motion.div>
              <div className="image-decoration">
                <motion.div
                  className="decoration-circle"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                  }}
                />
              </div>
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
            <div className="arrow-container">
              <motion.div
                className="arrow"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M12 19L5 12M12 19L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.div
                className="arrow arrow-2"
                animate={{
                  y: [0, 20, 40],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.2,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M12 19L5 12M12 19L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.div
                className="arrow arrow-3"
                animate={{
                  y: [0, 20, 60],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.4,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M12 19L5 12M12 19L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
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
          <motion.div
            className="about-text"
            style={{
              x: calculateParallax(50).x,
              y: calculateParallax(50).y,
            }}
          >
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
          </motion.div>

          <motion.div
            className="skills-container"
            style={{
              x: calculateParallax(-50).x,
              y: calculateParallax(-50).y,
            }}
          >
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
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
              whileHover={{ y: -10 }}
              style={{
                x: calculateParallax(80 + index * 10).x,
                y: calculateParallax(80 + index * 10).y,
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

        <motion.div
          className="view-all-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            x: calculateParallax(40).x,
            y: calculateParallax(40).y,
          }}
        >
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
          <motion.div
            className="contact-info"
            style={{
              x: calculateParallax(30).x,
              y: calculateParallax(30).y,
            }}
          >
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
          </motion.div>

          <motion.div
            className="contact-form-container"
            style={{
              x: calculateParallax(-30).x,
              y: calculateParallax(-30).y,
            }}
          >
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
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Kishan Bhandary. All Rights Reserved.</p>
          <p>Designed & Built with ❤️</p>
        </div>
      </footer>

      {/* Mouse follower */}
      <motion.div
        className="mouse-follower"
        style={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          scale: {
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
        }}
      />
      <motion.div
        className="mouse-follower-trail"
        style={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
          opacity: 0.3,
        }}
        transition={{
          default: {
            duration: 0.3,
            ease: "linear",
          },
        }}
      />
    </div>
  )
}

