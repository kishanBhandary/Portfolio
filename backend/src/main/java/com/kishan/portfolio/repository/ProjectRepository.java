package com.kishan.portfolio.repository;

import com.kishan.portfolio.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    
    // Find featured projects
    List<Project> findByFeaturedTrue();
    
    // Find projects by technology
    @Query("{ 'technologies': ?0 }")
    List<Project> findByTechnology(String technology);
    
    // Find projects ordered by creation date (most recent first)
    @Query(sort = "{ 'createdAt' : -1 }")
    List<Project> findAllOrderByCreatedAtDesc();
    
    // Find projects containing title keyword (case insensitive)
    List<Project> findByTitleContainingIgnoreCase(String keyword);
    
    // Find projects by description containing keyword
    List<Project> findByDescriptionContainingIgnoreCase(String keyword);
}