package com.adil.server;

import com.adil.server.entity.Book;
import com.adil.server.entity.Service;
import com.adil.server.entity.User;
import com.adil.server.entity.enums.UserRole;
import com.adil.server.repository.BookRepository;
import com.adil.server.repository.ServiceRepository;
import com.adil.server.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final ServiceRepository serviceRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {
       try{
           loadUsers();
           loadBooks();
           loadServices();

       }catch (DataIntegrityViolationException e){
           System.out.println("Erreur de contrainte d'unicité : " + e.getMessage());
       }

    }

    private void loadUsers() {
        List<User> users = Arrays.asList(
                User.builder()
                        .name("Admin")
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("admin"))
                        .role(UserRole.ROLE_ADMIN)
                        .build(),
                User.builder()
                        .name("Bob Smith")
                        .email("bob@example.com")
                        .password(passwordEncoder.encode("123"))
                        .role(UserRole.ROLE_USER)
                        .build()
        );

        for (User user : users) {
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isEmpty()) {
                userRepository.save(user);
            } else {
                System.out.println("User with email " + user.getEmail() + " already exists.");
            }
        }
    }

    private void loadBooks() {
        List<Book> books = Arrays.asList(
                Book.builder()
                        .title("The Encyclopedia of Modern Bodybuilding")
                        .author("Arnold Schwarzenegger")
                        .price(29.99f)
                        .description("A comprehensive guide to bodybuilding techniques.")
                        .image("book1.jpg")
                        .build(),
                Book.builder()
                        .title("Born to Run: A Hidden Tribe, Superathletes, and the Greatest Race the World Has Never Seen")
                        .author("Christopher McDougall")
                        .price(14.99f)
                        .description("A book about the hidden tribe of the world's greatest ultra-runners.")
                        .image("book2.jpg")
                        .build(),
                Book.builder()
                        .title("The Inner Game of Tennis: The Classic Guide to the Mental Side of Peak Performance")
                        .author("W. Timothy Gallwey")
                        .price(12.50f)
                        .description("A guide to mastering the mental aspects of tennis and other sports.")
                        .image("book3.jpg")
                        .build(),
                Book.builder()
                        .title("Endure: Mind, Body, and the Curiously Elastic Limits of Human Performance")
                        .author("Alex Hutchinson")
                        .price(18.75f)
                        .description("An exploration of the science of endurance and human limits.")
                        .image("book4.jpg")
                        .build()
        );

        bookRepository.saveAll(books);
    }
    private void loadServices() {
        List<Service> services = Arrays.asList(
                Service.builder()
                        .type("Personal Training")
                        .description("One-on-one personalized training sessions.")
                        .image("service1.jpg")
                        .build(),
                Service.builder()
                        .type("Group Fitness Classes")
                        .description("High-energy group fitness classes for all fitness levels.")
                        .image("service2.jpg")
                        .build(),
                Service.builder()
                        .type("Nutrition Counseling")
                        .description("Customized nutrition plans and counseling sessions.")
                        .image("service3.jpg")
                        .build(),
                Service.builder()
                        .type("Yoga and Meditation")
                        .description("Relaxing yoga sessions and guided meditation practices.")
                        .image("service4.jpg")
                        .build()
        );

        serviceRepository.saveAll(services);
    }
}
