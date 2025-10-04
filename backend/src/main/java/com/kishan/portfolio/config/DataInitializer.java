package com.kishan.portfolio.config;

import com.kishan.portfolio.entity.Project;
import com.kishan.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements ApplicationRunner {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Only initialize data if no projects exist
        if (projectRepository.count() == 0) {
            initializeProjects();
        }
    }
    
    private void initializeProjects() {
        // Create real projects from Kishan's GitHub
        Project portfolio = new Project();
        portfolio.setTitle("Interactive Portfolio Website");
        portfolio.setDescription("A modern, interactive portfolio website built with React and Spring Boot, featuring Netflix-style intro animations, dynamic project display, and a contact form with backend data handling. Includes custom cursor effects, background music, and smooth transitions.");
        portfolio.setTechnologies(Arrays.asList("React", "Spring Boot", "MongoDB", "Framer Motion", "Vite", "CSS3"));
        portfolio.setGithubUrl("https://github.com/kishanBhandary/Portfolio");
        portfolio.setLiveUrl("https://kishan-portfolio.vercel.app");
        portfolio.setFeatured(true);
        
        Project bookStore = new Project();
        bookStore.setTitle("BookStore Management System");
        bookStore.setDescription("A comprehensive bookstore management application with inventory tracking, customer management, and sales analytics. Features include book catalog management, order processing, and user authentication system.");
        bookStore.setTechnologies(Arrays.asList("Java", "Spring Framework", "MySQL", "JSP", "Bootstrap"));
        bookStore.setGithubUrl("https://github.com/kishanBhandary/BookStore");
        bookStore.setFeatured(true);
        
        Project collegeWebsite = new Project();
        collegeWebsite.setTitle("College Website");
        collegeWebsite.setDescription("Educational institution website with student portal, course management, faculty information, and administrative features. Includes responsive design and user-friendly navigation for students and staff.");
        collegeWebsite.setTechnologies(Arrays.asList("HTML5", "CSS3", "JavaScript", "PHP", "MySQL"));
        collegeWebsite.setGithubUrl("https://github.com/kishanBhandary/College-website");
        collegeWebsite.setFeatured(true);
        
        Project restaurantApp = new Project();
        restaurantApp.setTitle("Restaurant Management App");
        restaurantApp.setDescription("Complete restaurant management solution with menu management, order tracking, table reservations, and billing system. Features modern UI design and efficient workflow management for restaurant operations.");
        restaurantApp.setTechnologies(Arrays.asList("React", "Node.js", "Express.js", "MongoDB", "Material-UI"));
        restaurantApp.setGithubUrl("https://github.com/kishanBhandary/Restaurant-app");
        restaurantApp.setFeatured(true);
        
        Project weatherApp = new Project();
        weatherApp.setTitle("Weather Application");
        weatherApp.setDescription("Real-time weather application with location-based forecasting, weather maps, and detailed weather information. Provides current conditions, hourly forecasts, and 7-day weather outlook with intuitive user interface.");
        weatherApp.setTechnologies(Arrays.asList("JavaScript", "HTML5", "CSS3", "Weather API", "Geolocation API"));
        weatherApp.setGithubUrl("https://github.com/kishanBhandary/Weather-app");
        weatherApp.setFeatured(false);
        
        Project taskManager = new Project();
        taskManager.setTitle("Task Manager Application");
        taskManager.setDescription("Productivity-focused task management application with project organization, deadline tracking, and progress monitoring. Features include task categorization, priority settings, and collaborative workspace functionality.");
        taskManager.setTechnologies(Arrays.asList("React", "Redux", "Node.js", "PostgreSQL", "JWT"));
        taskManager.setGithubUrl("https://github.com/kishanBhandary/Task-manager");
        taskManager.setFeatured(false);
        
        Project ecommerce = new Project();
        ecommerce.setTitle("E-Commerce Platform");
        ecommerce.setDescription("Full-featured e-commerce platform with product catalog, shopping cart, secure payment processing, and order management. Includes admin dashboard for inventory management and sales analytics.");
        ecommerce.setTechnologies(Arrays.asList("React", "Spring Boot", "MySQL", "Stripe API", "Redux"));
        ecommerce.setGithubUrl("https://github.com/kishanBhandary/Ecommerce");
        ecommerce.setFeatured(false);
        
        Project chatApp = new Project();
        chatApp.setTitle("Real-time Chat Application");
        chatApp.setDescription("Modern chat application with real-time messaging, group chats, file sharing, and user presence indicators. Built with WebSocket technology for instant communication and responsive design for all devices.");
        chatApp.setTechnologies(Arrays.asList("React", "Socket.IO", "Node.js", "Express.js", "MongoDB"));
        chatApp.setGithubUrl("https://github.com/kishanBhandary/Chat-app");
        chatApp.setFeatured(false);
        
        // Save all projects
        List<Project> projects = Arrays.asList(portfolio, bookStore, collegeWebsite, restaurantApp, weatherApp, taskManager, ecommerce, chatApp);
        projectRepository.saveAll(projects);
        
        System.out.println("Kishan's real projects initialized successfully! Total projects: " + projects.size());
    }
}