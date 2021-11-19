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
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "bookName")
    private String bookName;
    @Column(name = "authorName")
    private String authorName;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "price")
    private double price;
}
