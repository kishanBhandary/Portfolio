// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
    // Submit contact form
    static async submitContact(contactData) {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit contact form');
            }

            return await response.json();
        } catch (error) {
            console.error('Contact form submission error:', error);
            throw error;
        }
    }

    // Get all projects
    static async getProjects() {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`);

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            return await response.json();
        } catch (error) {
            console.error('Projects fetch error:', error);
            throw error;
        }
    }

    // Get project by ID
    static async getProject(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch project');
            }

            return await response.json();
        } catch (error) {
            console.error('Project fetch error:', error);
            throw error;
        }
    }

    // Search projects
    static async searchProjects(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/search?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error('Failed to search projects');
            }

            return await response.json();
        } catch (error) {
            console.error('Project search error:', error);
            throw error;
        }
    }

    // Admin functions (require authentication in the future)
    static async createProject(projectData) {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create project');
            }

            return await response.json();
        } catch (error) {
            console.error('Project creation error:', error);
            throw error;
        }
    }

    static async updateProject(id, projectData) {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update project');
            }

            return await response.json();
        } catch (error) {
            console.error('Project update error:', error);
            throw error;
        }
    }

    static async deleteProject(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            return true;
        } catch (error) {
            console.error('Project deletion error:', error);
            throw error;
        }
    }
}

export default ApiService;