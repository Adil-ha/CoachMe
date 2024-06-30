package com.adil.server.repository;

import com.adil.server.dto.BookDTO;
import com.adil.server.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
}
