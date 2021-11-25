package com.bookstore.backend.contoller;


import com.bookstore.backend.model.Book;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/books")
public class BookController {

    @Autowired
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getBooks();
    }

    @GetMapping(path = "{id}")
    public Book getBook(@PathVariable("id") Long id){return bookService.getBook(id);}

    // build create book REST API
    @PostMapping
    public Book addNewBook(@RequestParam("file") MultipartFile file,
                           @RequestParam("bookName") String bookName,
                           @RequestParam("authorName") String authorName,
                           @RequestParam("quantity") int quantity,
                           @RequestParam("price") double price){

        return bookService.addBook(file, bookName, authorName, quantity, price);

    }

    // build update book REST API
    @PutMapping(path = "{bookId}")
    public void updateBook(
            @PathVariable("bookId") Long id,
            @RequestParam(value="file" , required=false)MultipartFile file,
            @RequestParam("bookName") String bookName,
            @RequestParam("authorName") String authorName,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price){
        bookService.updateBook(file, id, bookName,authorName,price,quantity);
    }

    // build delete book REST API
    @DeleteMapping(path = "{bookId}")
    public void deleteBook(@PathVariable("bookId") Long id){
        bookService.deleteBookById(id);

    }
}
