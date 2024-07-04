package com.adil.server;

import com.adil.server.entity.Book;
import com.adil.server.entity.Performance;

import com.adil.server.entity.User;
import com.adil.server.entity.enums.UserRole;
import com.adil.server.repository.BookRepository;
import com.adil.server.repository.PerformanceRepository;

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
    private final PerformanceRepository performanceRepository;
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

        for (Book book : books) {
            Optional<Book> existingBook = bookRepository.findByTitle(book.getTitle());
            if (existingBook.isEmpty()) {
                bookRepository.save(book);
            } else {
                System.out.println("Book with title " + book.getTitle() + " already exists.");
            }
        }
    }
    private void loadServices() {
        List<Performance> performances = Arrays.asList(
                Performance.builder()
                        .type("La perte de poids")
                        .description("Séances d'entraînement personnalisées en tête-à-tête pour atteindre vos objectifs de perte de poids. Nous utilisons une approche combinée de cardio, de musculation et de conseils nutritionnels pour vous aider à perdre du poids de manière saine et durable.")
                        .image("service1.jpg")
                        .build(),
                Performance.builder()
                        .type("Le Pilates")
                        .description("Cours de Pilates énergiques en groupe, adaptés à tous les niveaux de condition physique. Ces séances vous aideront à améliorer votre posture, votre flexibilité et votre force, tout en réduisant le stress et les tensions corporelles.")
                        .image("service2.jpg")
                        .build(),
                Performance.builder()
                        .type("La remise en forme")
                        .description("Plans de nutrition personnalisés et séances de conseil pour retrouver la forme. Nous offrons des programmes sur mesure pour vous aider à adopter un mode de vie plus sain, améliorer votre endurance et atteindre vos objectifs de fitness.")
                        .image("service3.jpg")
                        .build(),
                Performance.builder()
                        .type("Le renforcement musculaire")
                        .description("Programmes de musculation pour développer et tonifier vos muscles. Nos entraîneurs expérimentés vous guideront à travers des exercices ciblés pour augmenter votre force, votre endurance et votre masse musculaire.")
                        .image("service4.jpg")
                        .build(),
                Performance.builder()
                        .type("La gym douce")
                        .description("Séances de gym douce pour améliorer votre souplesse et votre bien-être général. Idéal pour les personnes cherchant à se détendre tout en faisant de l'exercice, ces cours combinent des mouvements doux avec des techniques de relaxation.")
                        .image("service5.jpg")
                        .build(),
                Performance.builder()
                        .type("La boxe")
                        .description("Entraînements de boxe pour améliorer votre condition physique et votre endurance. Nos sessions de boxe combinent des exercices cardiovasculaires intenses avec des techniques de boxe pour brûler des calories, renforcer votre corps et améliorer votre agilité.")
                        .image("service6.jpg")
                        .build()
        );

        for (Performance performance : performances) {
            Optional<Performance> existingPerformance = performanceRepository.findByType(performance.getType());
            if (existingPerformance.isEmpty()) {
                performanceRepository.save(performance);
            } else {
                System.out.println("Performance with type " + performance.getType() + " already exists.");
            }
        }
    }
}
