import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApiService from '../services/ApiService';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            await ApiService.submitContact(formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });

            // Clear success message after 5 seconds
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);
        } catch (error) {
            setStatus({
                loading: false,
                success: false,
                error: error.message || 'Failed to send message. Please try again.'
            });
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="contact-header"
                >
                    <h2>Get In Touch</h2>
                    <p>Let's discuss your next project or collaboration</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="contact-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={status.loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={status.loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                            disabled={status.loading}
                        />
                    </div>

                    {status.error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="form-message error"
                        >
                            {status.error}
                        </motion.div>
                    )}

                    {status.success && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="form-message success"
                        >
                            Thank you! Your message has been sent successfully.
                        </motion.div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={status.loading}
                        className={`submit-btn ${status.loading ? 'loading' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {status.loading ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="contact-info"
                >
                    <div className="contact-item">
                        <h3>Email</h3>
                        <p>kishan@example.com</p>
                    </div>
                    <div className="contact-item">
                        <h3>LinkedIn</h3>
                        <p>linkedin.com/in/kishan</p>
                    </div>
                    <div className="contact-item">
                        <h3>GitHub</h3>
                        <p>github.com/kishan</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;