import React, { useState, useEffect } from 'react'
import BookService from '../../services/BookService'
import { Link } from 'react-router-dom'

const AllBookList = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        getAllBooks();
    }, [])

    const getAllBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteBook = (bookId) => {
        BookService.deleteBook(bookId).then((response) => {
            getAllBooks();

        }).catch(error => {
            console.log(error);
        })

    }
    return (
        <div className="container">
            <h1 className="text-center"> Book List </h1>
            <Link to="/add-book" className="btn btn-primary mb-2" style={{marginTop:"15px",width:"120px"}} > Add Book </Link>
            <table className="table table-bordered">
                <thead>
                    <tr className="tr-expand-md tr-dark bg-dark" style={{color:"white", fontSize:"17px",textAlign:"center"}}>
                    <th> Book Name </th>
                    <th> Author Name </th>
                    <th> Price </th>
                    <th> Quantity </th>
                    <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(
                            book =>
                                <tr key={book.id}>
                                    <td> {book.bookName} </td>
                                    <td> {book.authorName} </td>
                                    <td>{book.price}</td>
                                    <td>{book.quantity}</td>
                                    <td>
                                        <Link className="btn btn-info" to={`/edit-book/${book.id}`} style={{ marginLeft: "25%" }}>Update</Link>
                                        <button className="btn btn-danger" onClick={() => deleteBook(book.id)}
                                            style={{ marginLeft: "10px" }}> Delete</button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default AllBookList
