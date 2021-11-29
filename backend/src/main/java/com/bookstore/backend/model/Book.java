package com.bookstore.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
//@Data
@NoArgsConstructor
@Entity
public class Book {
    @Id
//    @SequenceGenerator(
//            name = "book_sequence",
//            sequenceName = "book_sequence",
//            allocationSize = 1
//    )
//    @GeneratedValue(
//            strategy = GenerationType.SEQUENCE,
//            generator = "book_sequence"
//    )

    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String bookName;
    private String authorName;
    private int quantity;
    private Double price;
    private String invoicePath;

    public Book(String bookName, String authorName, int quantity,Double price,String invoicePath) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.quantity=quantity;
        this.price = price;
        this.invoicePath=invoicePath;
    }


    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + bookName + '\'' +
                ", author='" + authorName + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", invoice='" + invoicePath + '\'' +
                '}';
    }
}
