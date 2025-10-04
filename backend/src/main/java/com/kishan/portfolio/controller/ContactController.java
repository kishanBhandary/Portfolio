package com.kishan.portfolio.controller;

import com.kishan.portfolio.entity.Contact;
import com.kishan.portfolio.service.ContactService;
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
@RequestMapping("/api/contact")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ContactController {
    
    @Autowired
    private ContactService contactService;
    
    /**
     * Submit a contact form
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody Contact contact) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Contact savedContact = contactService.saveContact(contact);
            response.put("success", true);
            response.put("message", "Thank you for your message! I'll get back to you soon.");
            response.put("contactId", savedContact.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Something went wrong. Please try again later.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Get all contacts (admin endpoint)
     */
    @GetMapping("/admin/all")
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }
    
    /**
     * Get contact by ID (admin endpoint)
     */
    @GetMapping("/admin/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Optional<Contact> contact = contactService.getContactById(id);
        return contact.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Delete contact (admin endpoint)
     */
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Map<String, Object>> deleteContact(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            contactService.deleteContact(id);
            response.put("success", true);
            response.put("message", "Contact deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to delete contact");
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
        response.put("service", "Contact API");
        return ResponseEntity.ok(response);
    }
}