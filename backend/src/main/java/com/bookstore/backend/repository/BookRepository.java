package com.bookstore.backend.repository;

import com.bookstore.backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {
    //all crud database methods
}
