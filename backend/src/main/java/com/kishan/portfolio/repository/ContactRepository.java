package com.kishan.portfolio.repository;

import com.kishan.portfolio.entity.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {
    
    // Find contacts by email
    List<Contact> findByEmail(String email);
    
    // Find contacts created after a specific date
    List<Contact> findByCreatedAtAfter(LocalDateTime date);
    
    // Find contacts ordered by creation date (most recent first)
    List<Contact> findAllByOrderByCreatedAtDesc();
    
    // Count contacts by email (for spam detection)
    long countByEmail(String email);
}