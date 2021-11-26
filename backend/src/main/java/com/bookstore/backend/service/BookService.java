package com.bookstore.backend.service;

import org.dom4j.DocumentException;
import com.bookstore.backend.model.Book;
import com.bookstore.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Properties;

@Service
public class BookService {


    private final BookRepository bookRepository;
    @Autowired

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks(){
        return bookRepository.findAll();
    }

    public Book saveBook(Book book){
        return bookRepository.save(book);
    }

    public void updateBook(MultipartFile file, Long id, String bookName, String authorName, double price, int quantity){
        String path = null;

        if(file!= null && !file.isEmpty()){
            path = uploadInvoice(file);
        }
        Book book = bookRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException("Book with book id " +id+ " not exists!"));

        if(bookName != null && bookName.length() > 0){
            book.setBookName(bookName);
        }

        if(authorName != null && authorName.length() > 0){
            book.setAuthorName(authorName);
        }

        if(path != null && path.length() > 0 ){
            book.setInvoicePath(path);
        }

        if(quantity !=0){
            book.setQuantity(quantity);
        }

        if(price !=0){
            book.setPrice(price);
        }

        bookRepository.save(book);
    }

    public void deleteBook(Long id){
        bookRepository.deleteById(id);
    }
    public Book getBook(Long id) {
        Book book=bookRepository.findById(id).orElse(null);
        if (book != null){
            return  book;
        }else{
            throw new RuntimeException("Book is not found for the id "+id);
        }

    }

    public String uploadInvoice(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path path = Paths.get("/upload", fileName).toAbsolutePath();
        System.out.println(path.toString());
        try {
            byte[] bytes = file.getBytes();
            Files.write(path, bytes);
        } catch (IOException ex) {

        }

        return fileName;
    }

    public void deleteInvoice(String pathName){
        File file = new File(pathName);
        file.delete();
    }

    public Book addBook(MultipartFile file, String bookName, String authorName, int quantity, double price) {
        Book book = new Book();

        String path = null;

        if(!file.isEmpty()){
            path = uploadInvoice(file);
        }

        book.setBookName(bookName);
        book.setAuthorName(authorName);
        book.setPrice(price);
        book.setQuantity(quantity);
        book.setInvoicePath(path);

       return saveBook(book);
    }

    public void deleteBookById(Long id) {
        Book book = getBook(id);
        deleteInvoice(book.getInvoicePath());
        deleteBook(id);
    }
}
