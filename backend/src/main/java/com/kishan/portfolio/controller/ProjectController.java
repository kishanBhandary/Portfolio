package com.kishan.portfolio.controller;

import com.kishan.portfolio.entity.Project;
import com.kishan.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    /**
     * Get all projects
     */
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    /**
     * Get featured projects only
     */
    @GetMapping("/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        List<Project> projects = projectService.getFeaturedProjects();
        return ResponseEntity.ok(projects);
    }
    
    /**
     * Get project by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Search projects by technology
     */
    @GetMapping("/search/technology")
    public ResponseEntity<List<Project>> getProjectsByTechnology(@RequestParam String tech) {
        List<Project> projects = projectService.getProjectsByTechnology(tech);
        return ResponseEntity.ok(projects);
    }
    
    /**
     * Search projects by title keyword
     */
    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(@RequestParam String q) {
        List<Project> projects = projectService.searchProjectsByTitle(q);
        return ResponseEntity.ok(projects);
    }
    
    /**
     * Create a new project (admin endpoint)
     */
    @PostMapping("/admin")
    public ResponseEntity<Map<String, Object>> createProject(@Valid @RequestBody Project project) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Project savedProject = projectService.saveProject(project);
            response.put("success", true);
            response.put("message", "Project created successfully");
            response.put("project", savedProject);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to create project: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Update an existing project (admin endpoint)
     */
    @PutMapping("/admin/{id}")
    public ResponseEntity<Map<String, Object>> updateProject(@PathVariable String id, @Valid @RequestBody Project project) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Project updatedProject = projectService.updateProject(id, project);
            response.put("success", true);
            response.put("message", "Project updated successfully");
            response.put("project", updatedProject);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to update project");
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Delete a project (admin endpoint)
     */
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Map<String, Object>> deleteProject(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            projectService.deleteProject(id);
            response.put("success", true);
            response.put("message", "Project deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to delete project");
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("service", "Projects API");
        return ResponseEntity.ok(response);
    }
}