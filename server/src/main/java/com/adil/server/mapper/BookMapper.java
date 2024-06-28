package com.adil.server.mapper;

import com.adil.server.dto.BookDTO;
import com.adil.server.entity.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {
    BookDTO toDto(Book book);
    Book toEntity(BookDTO bookDTO);
}
