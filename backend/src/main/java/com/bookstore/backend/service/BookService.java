package com.bookstore.backend.service;

import com.bookstore.backend.model.Book;
import com.bookstore.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBook(Long id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            return book;
        } else {
            throw new RuntimeException("Book is not found for the id " + id);
        }

    }

    public Resource getFile(Long id) {
        Book bookStore = bookRepository.findById(id).orElse(null);
        if (bookStore != null) {
            String filepath = bookStore.getInvoicePath();
            Path path = Paths.get(filepath);
            Resource resource = null;
            try {
                resource = new UrlResource(path.toUri());
            } catch (MalformedURLException e) {
                System.out.println(e);
            }
            return resource;
        } else {
            throw new IllegalStateException("Book id with" + id + "does not exist");
        }
    }

    public void addNewBook(MultipartFile file, String bookName, String authorName, int quantity, Double price) {
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get("/upload", fileName).toAbsolutePath();

        try {
            byte[] content = file.getBytes();
            Files.write(filePath, content);
        } catch (IOException e) {
            System.out.println(e);
        }


        Book saveBook = new Book(bookName, authorName, quantity, price, filePath.toString());
        bookRepository.save(saveBook);
    }

    public void updateBook(MultipartFile file, Long id, String bookName, String authorName, Double price, int quantity) {
        Book bookStore = bookRepository.findById(id).orElse(null);
        if (bookStore != null) {
            if (bookName != null && bookName.length() > 0) {
                bookStore.setBookName(bookName);
            }
            if (authorName != null && authorName.length() > 0) {
                bookStore.setAuthorName(authorName);
            }

            if (price != null && price > 0) {
                bookStore.setPrice(price);
            }

            if (quantity > 0) {
                bookStore.setQuantity(quantity);
            }

            if (file != null) {
                String filename = file.getOriginalFilename();
                Path filePath = Paths.get("/upload", filename).toAbsolutePath();

                try {
                    byte[] content = file.getBytes();
                    Files.write(filePath, content);
                } catch (IOException e) {
                    System.out.println(e);
                }

                bookStore.setInvoicePath(filePath.toString());
            }

            bookRepository.save(bookStore);
        } else {
            throw new IllegalStateException("Book id with" + id + "does not exist");
        }
    }

    public void deleteBookById(Long id) {
        bookRepository.deleteById(id);
    }


}
