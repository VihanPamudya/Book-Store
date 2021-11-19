package com.bookstore.backend;

import com.bookstore.backend.model.Book;
import com.bookstore.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private BookRepository bookRepository;

	@Override
	public void run(String... args) throws Exception {
//		Book book1=new Book();
//		book1.setId(1);
//		book1.setBookName("madolduwa");
//		book1.setAuthorName("vihan");
//		book1.setPrice(250);
//		book1.setQuantity(10);
//		bookRepository.save(book1);
//
//		Book book2=new Book();
//		book2.setId(2);
//		book2.setBookName("madolduwa");
//		book2.setAuthorName("vihan");
//		book2.setPrice(250);
//		book2.setQuantity(10);
//		bookRepository.save(book2);
	}
}
