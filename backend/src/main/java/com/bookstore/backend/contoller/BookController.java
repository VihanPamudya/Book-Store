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

    private final BookService bookService;
    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getBooks();
    }

    // build create book REST API
    @PostMapping
    public void addNewBook(@RequestParam("file") MultipartFile file,
                           @RequestParam("bookName") String bookName,
                           @RequestParam("authorName") String authorName,
                           @RequestParam("quantity") int quantity,
                           @RequestParam("price") double price){
        Book book = new Book();

        String path = null;

        if(!file.isEmpty()){
            path = bookService.uploadInvoice(file);
        }

        book.setBookName(bookName);
        book.setAuthorName(authorName);
        book.setPrice(price);
        book.setQuantity(quantity);
        book.setInvoicePath(path);

        bookService.saveBook(book);
    }

    // build update book REST API
    @PutMapping(path = "{bookId}")
    public void updateBook(
            @PathVariable("bookId") Long id,
            @RequestParam("file")MultipartFile file,
            @RequestParam("bookName") String bookName,
            @RequestParam("authorName") String authorName,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price){

        String path = null;

        if(!file.isEmpty()){
            path = bookService.uploadInvoice(file);
        }
        bookService.updateBook(id, bookName,authorName,price,quantity,path);
    }

    // build delete book REST API
    @DeleteMapping(path = "{bookId}")
    public void deleteBook(@PathVariable("bookId") Long id){
        Book book = bookService.getBook(id);
        bookService.deleteInvoice(book.getInvoicePath());
        bookService.deleteBook(id);
    }
}
