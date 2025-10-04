import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApiService from '../services/ApiService';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = projects.filter(project =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.technologies.some(tech =>
                    tech.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setFilteredProjects(filtered);
        } else {
            setFilteredProjects(projects);
        }
    }, [searchQuery, projects]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await ApiService.getProjects();
            setProjects(data);
            setError(null);
        } catch (err) {
            setError('Failed to load projects. Please try again later.');
            console.error('Projects fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const getTechColor = (tech) => {
        const colors = {
            'React': '#61dafb',
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'Node.js': '#339933',
            'Python': '#3776ab',
            'Java': '#ed8b00',
            'Spring Boot': '#6db33f',
            'MongoDB': '#47a248',
            'PostgreSQL': '#336791',
            'Docker': '#2496ed',
            'AWS': '#ff9900',
            'Firebase': '#ffca28',
            'Vue.js': '#4fc08d',
            'Angular': '#dd0031',
            'Express': '#000000',
            'Next.js': '#000000',
            'Tailwind CSS': '#06b6d4',
            'SCSS': '#cf649a',
            'GraphQL': '#e10098',
            'Redux': '#764abc'
        };
        return colors[tech] || '#667eea';
    };

    if (loading) {
        return (
            <section id="projects" className="projects-section">
                <div className="container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading projects...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="projects" className="projects-section">
                <div className="container">
                    <div className="error-message">
                        <h3>Oops! Something went wrong</h3>
                        <p>{error}</p>
                        <button onClick={fetchProjects} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="projects-header"
                >
                    <h2>Featured Projects</h2>
                    <p>A showcase of my recent work and technical expertise</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="search-container"
                >
                    <input
                        type="text"
                        placeholder="Search projects by name, description, or technology..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </motion.div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="project-card"
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            {project.imageUrl && (
                                <div className="project-image">
                                    <img src={project.imageUrl} alt={project.title} />
                                    <div className="project-overlay">
                                        <div className="project-links">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-technologies">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="tech-tag"
                                            style={{ backgroundColor: getTechColor(tech) + '20', color: getTechColor(tech) }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {!project.imageUrl && (
                                    <div className="project-links-bottom">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProjects.length === 0 && searchQuery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="no-results"
                    >
                        <h3>No projects found</h3>
                        <p>Try adjusting your search terms or browse all projects</p>
                        <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                            Clear Search
                        </button>
                    </motion.div>
                )}

                {projects.length === 0 && !loading && (
                    <div className="no-projects">
                        <h3>No projects yet</h3>
                        <p>Check back soon for exciting new projects!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;