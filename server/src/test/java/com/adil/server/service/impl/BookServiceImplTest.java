package com.adil.server.service.impl;

import com.adil.server.dto.BookDTO;
import com.adil.server.entity.Book;
import com.adil.server.mapper.BookMapper;
import com.adil.server.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private BookMapper bookMapper;

    @InjectMocks
    private BookServiceImpl bookService;

    private Book book;
    private BookDTO bookDTO;

    @BeforeEach
    void setUp() {
        book = new Book();
        book.setId(1L);
        book.setTitle("Title");
        book.setAuthor("Author");
        book.setPrice(19.99F);
        book.setDescription("Description");
        book.setImage("Image");

        bookDTO = new BookDTO();
        bookDTO.setId(1L);
        bookDTO.setTitle("Title");
        bookDTO.setAuthor("Author");
        bookDTO.setPrice(19.99F);
        bookDTO.setDescription("Description");
        bookDTO.setImage("Image");
    }

    @Test
    void createBook() {
        when(bookMapper.toEntity(any(BookDTO.class))).thenReturn(book);
        when(bookRepository.save(any(Book.class))).thenReturn(book);
        when(bookMapper.toDto(any(Book.class))).thenReturn(bookDTO);

        BookDTO result = bookService.createBook(bookDTO);

        assertNotNull(result);
        assertEquals(bookDTO.getTitle(), result.getTitle());
        verify(bookRepository, times(1)).save(book);
    }

    @Test
    void getAllBooks() {
        List<Book> books = Arrays.asList(book);
        List<BookDTO> bookDTOs = Arrays.asList(bookDTO);

        when(bookRepository.findAll()).thenReturn(books);
        when(bookMapper.toDto(any(Book.class))).thenReturn(bookDTO);

        List<BookDTO> result = bookService.getAllBooks();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(bookDTO.getTitle(), result.get(0).getTitle());
        verify(bookRepository, times(1)).findAll();
    }

    @Test
    void getBookById() {
        when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));
        when(bookMapper.toDto(any(Book.class))).thenReturn(bookDTO);

        BookDTO result = bookService.getBookById(1L);

        assertNotNull(result);
        assertEquals(bookDTO.getTitle(), result.getTitle());
        verify(bookRepository, times(1)).findById(1L);
    }

    @Test
    void updateBook() {
        when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));
        when(bookRepository.save(any(Book.class))).thenReturn(book);
        when(bookMapper.toDto(any(Book.class))).thenReturn(bookDTO);

        BookDTO result = bookService.updateBook(1L, bookDTO);

        assertNotNull(result);
        assertEquals(bookDTO.getTitle(), result.getTitle());
        verify(bookRepository, times(1)).findById(1L);
        verify(bookRepository, times(1)).save(book);
    }

    @Test
    void deleteBook() {
        when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));

        boolean result = bookService.deleteBook(1L);

        assertTrue(result);
        verify(bookRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteBook_NotFound() {
        when(bookRepository.findById(anyLong())).thenReturn(Optional.empty());

        boolean result = bookService.deleteBook(1L);

        assertFalse(result);
        verify(bookRepository, never()).deleteById(anyLong());
    }
}
