package com.kishan.portfolio.service;

import com.kishan.portfolio.entity.Contact;
import com.kishan.portfolio.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    /**
     * Save a new contact message
     */
    public Contact saveContact(Contact contact) {
        // Basic spam protection - limit 5 messages per email per day
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        List<Contact> recentContacts = contactRepository.findByCreatedAtAfter(yesterday)
                .stream()
                .filter(c -> c.getEmail().equals(contact.getEmail()))
                .toList();
        
        if (recentContacts.size() >= 5) {
            throw new RuntimeException("Too many messages from this email. Please try again later.");
        }
        
        return contactRepository.save(contact);
    }
    
    /**
     * Get all contacts (admin only)
     */
    public List<Contact> getAllContacts() {
        return contactRepository.findAllOrderByCreatedAtDesc();
    }
    
    /**
     * Get contact by ID
     */
    public Optional<Contact> getContactById(String id) {
        return contactRepository.findById(id);
    }
    
    /**
     * Get contacts by email
     */
    public List<Contact> getContactsByEmail(String email) {
        return contactRepository.findByEmail(email);
    }
    
    /**
     * Get recent contacts
     */
    public List<Contact> getRecentContacts(int days) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(days);
        return contactRepository.findByCreatedAtAfter(cutoffDate);
    }
    
    /**
     * Delete a contact message
     */
    public void deleteContact(String id) {
        contactRepository.deleteById(id);
    }
}