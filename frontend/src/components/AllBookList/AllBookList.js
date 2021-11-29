import React, { useState, useEffect } from 'react'
import BookService from '../../services/BookService'
import { Link,useNavigate } from 'react-router-dom'


const AllBookList = () => {

    const [books, setBooks] = useState([])
    const history = useNavigate();



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

    function viewBook(id){
        history(`/view-book/${id}`);
    }
    return (
        <div className="container">
            <h1 className="text-center mt-3"> Book List </h1>
            <Link to="/add-book" className="btn btn-primary mb-2" style={{ marginTop: "20px", width: "100px" }} > Add Book </Link>
            <table className="table table-bordered">
                <thead>
                    <tr className="tr-expand-md tr-dark bg-dark" style={{ color: "white", fontSize: "17px", textAlign: "center" }}>
                        <th> Book Name </th>
                        <th> Author Name </th>
                        <th> Quantity </th>
                        <th> Price </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {
                        books.map(
                            book =>
                                <tr key={book.id}>
                                    <td style={{ paddingTop: "15px",cursor:"pointer" }} onClick={()=>viewBook(book.id)}> {book.bookName} </td>
                                    <td style={{ paddingTop: "15px",cursor:"pointer" }} onClick={()=>viewBook(book.id)}> {book.authorName} </td>
                                    <td style={{ paddingTop: "15px",cursor:"pointer" }} onClick={()=>viewBook(book.id)}>{book.quantity}</td>
                                    <td style={{ paddingTop: "15px",cursor:"pointer" }} onClick={()=>viewBook(book.id)}>{book.price}</td>
                                    <td>
                                        <Link className="btn btn-success" to={`/edit-book/${book.id}`} style={{ width: "80px" }}>Update</Link>
                                        {/* <Link className="btn btn-secondary" to={`/view-book/${book.id}`} style={{ marginLeft: "15px", width: "80px",color: "white" }}>View</Link> */}
                                        <button className="btn btn-danger" onClick={() => deleteBook(book.id)}
                                            style={{ marginLeft: "15px", width: "80px" }}> Delete</button>

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
