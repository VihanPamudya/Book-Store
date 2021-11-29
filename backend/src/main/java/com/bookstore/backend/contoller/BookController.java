package com.bookstore.backend.contoller;


import com.bookstore.backend.model.Book;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
//@RequestMapping("api/v1/books")
@RequestMapping(path = "books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getBooks();
    }

    @GetMapping(path = "{id}")
    public Book getBook(@PathVariable("id") Long id) {
        return bookService.getBook(id);
    }

    @GetMapping(path = "invoice/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable("id") Long id) {
        Resource file = bookService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    // build create book REST API
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addNewBook(@RequestParam("file") MultipartFile file,
                           @RequestParam("bookName") String bookName,
                           @RequestParam("authorName") String authorName,
                           @RequestParam("quantity") int quantity,
                           @RequestParam("price") Double price) throws IOException {

        bookService.addBook(file, bookName, authorName, quantity, price);

    }

    // build update book REST API
    @PutMapping(path = "{bookId}")
    public void updateBook(
            @PathVariable(name = "bookId") Long bookId,
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "bookName", required = false) String bookName,
            @RequestParam(name = "authorName", required = false) String authorName,
            @RequestParam(name = "quantity", required = false) int quantity,
            @RequestParam(name = "price", required = false) Double price) {
        bookService.updateBook(file, bookId, bookName, authorName, price, quantity);
    }

    // build delete book REST API
    @DeleteMapping(path = "{bookId}")
    public void deleteBook(@PathVariable("bookId") Long bookId) {
        bookService.deleteBookById(bookId);

    }
}
