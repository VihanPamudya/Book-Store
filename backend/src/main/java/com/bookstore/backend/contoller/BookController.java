package com.bookstore.backend.contoller;

import com.bookstore.backend.exception.ResourceNotFoundException;
import com.bookstore.backend.model.Book;
import com.bookstore.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/books")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // build create employee REST API
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    // build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Book> getBookById(@PathVariable long id){
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(book);
    }

    // build update employee REST API
    @PutMapping("{id}")
    public ResponseEntity<Book> updateBook(@PathVariable long id,@RequestBody Book bookDetails) {
        Book updateBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        updateBook.setBookName(bookDetails.getBookName());
        updateBook.setAuthorName(bookDetails.getAuthorName());
        updateBook.setPrice(bookDetails.getPrice());
        updateBook.setQuantity(bookDetails.getQuantity());

        bookRepository.save(updateBook);

        return ResponseEntity.ok(updateBook);
    }

    // build delete employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteBook(@PathVariable long id){

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        bookRepository.delete(book);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
