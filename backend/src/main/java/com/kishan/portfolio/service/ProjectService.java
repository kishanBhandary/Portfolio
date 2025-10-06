package com.kishan.portfolio.service;

import com.kishan.portfolio.entity.Project;
import com.kishan.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    /**
     * Save a new project
     */
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }
    
        /**
     * Get all projects ordered by creation date
     */
    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc();
    }
    
    /**
     * Get featured projects only
     */
    public List<Project> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrue();
    }
    
    /**
     * Get project by ID
     */
    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }
    
    /**
     * Update an existing project
     */
    public Project updateProject(String id, Project updatedProject) {
        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            project.setTitle(updatedProject.getTitle());
            project.setDescription(updatedProject.getDescription());
            project.setTechnologies(updatedProject.getTechnologies());
            project.setImageUrl(updatedProject.getImageUrl());
            project.setGithubUrl(updatedProject.getGithubUrl());
            project.setLiveUrl(updatedProject.getLiveUrl());
            project.setFeatured(updatedProject.getFeatured());
            project.onUpdate(); // Call the update lifecycle method
            return projectRepository.save(project);
        } else {
            throw new RuntimeException("Project not found with id: " + id);
        }
    }
    
    /**
     * Delete a project
     */
    public void deleteProject(String id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
        } else {
            throw new RuntimeException("Project not found with id: " + id);
        }
    }
    
    /**
     * Search projects by technology
     */
    public List<Project> getProjectsByTechnology(String technology) {
        return projectRepository.findByTechnology(technology);
    }
    
    /**
     * Search projects by title keyword
     */
    public List<Project> searchProjectsByTitle(String keyword) {
        return projectRepository.findByTitleContainingIgnoreCase(keyword);
    }
}