/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion"
import ApiService from "../services/ApiService"
import "./MainContent.css"
import projectImage1 from "../assets/1.webp"
import projectImage2 from "../assets/2.jpg"
import projectImage3 from "../assets/3.webp"

export default function MainContent() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  })
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

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await ApiService.getProjects()
        setProjects(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ loading: true, success: false, error: null })

    try {
      await ApiService.submitContact(formData)
      setFormStatus({ loading: false, success: true, error: null })
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message })
    }
  }

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
            <div className="hero-text-container">
              <motion.div
                className="greeting-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="hello-text">Hello, I'm</span>
              </motion.div>

              <motion.h1
                className="name-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Kishan C Bhandary
              </motion.h1>

              <motion.h2
                className="role-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Backend Developer
              </motion.h2>

              <motion.div
                className="description-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="description-text">
                  Crafting innovative digital experiences at the intersection of human creativity and artificial intelligence.
                </p>
              </motion.div>

              <motion.div
                className="hero-credentials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="credential-item">
                  <span className="credential-icon">🎓</span>
                  <span className="credential-text">Information  Science Graduate</span>
                </div>
                <div className="credential-item">
                  <span className="credential-icon">💼</span>
                  <span className="credential-text">Full-Stack Developer</span>
                </div>
              </motion.div>
            </div>

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
                whileHover={{ scale: 1.05 }}
              >
                <img src="/kishan.png" alt="Kishan Bhandary" className="profile-image" />
              </motion.div>
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

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error loading projects: {error}</p>
          </div>
        ) : (
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
                  <img src={project.imageUrl || "/placeholder.svg"} alt={project.title} />
                  <div className="project-overlay">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-project-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      View Project
                    </motion.a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="project-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="view-all-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            x: calculateParallax(40).x,
            y: calculateParallax(40).y,
          }}
        >
          <a href="https://github.com/kishanBhandary" target="_blank" rel="noopener noreferrer" className="view-all-btn">
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
          <p className="section-subtitle">
            Let's discuss how we can work together to bring your ideas to life
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="contact-container">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-intro">
              <h3>Let's Start a Conversation</h3>
              <p>
                I'm always excited to work on new projects and collaborate with amazing people.
                Whether you have a question, a project idea, or just want to say hello, I'd love to hear from you.
              </p>
            </div>

            <div className="contact-details">
              <motion.div
                className="contact-item"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="contact-icon-wrapper">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Email</span>
                  <a href="mailto:kishanbhandary0@gmail.com" className="contact-value">
                    kishanbhandary0@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="contact-item"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="contact-icon-wrapper">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Mangalore, India</span>
                </div>
              </motion.div>

              <motion.div
                className="contact-item"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="contact-icon-wrapper">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Phone</span>
                  <a href="tel:+919164490335" className="contact-value">+91 9164490335</a>
                </div>
              </motion.div>
            </div>

            <div className="social-section">
              <h4>Follow Me</h4>
              <div className="social-links">
                <motion.a
                  href="https://github.com/kishanBhandary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github"
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/kishan-bhandary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>

                <motion.a
                  href="https://twitter.com/kishanbhandary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link twitter"
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Twitter"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="form-header">
              <h3>Send Me a Message</h3>
              <p>Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hello..."
                  rows="6"
                  required
                ></textarea>
              </div>

              {formStatus.success && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {formStatus.error && (
                <motion.div
                  className="error-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ❌ Error: {formStatus.error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus.loading}
              >
                {formStatus.loading ? (
                  <>
                    <div className="loading-spinner-small"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                    </svg>
                    Send Message
                  </>
                )}
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

