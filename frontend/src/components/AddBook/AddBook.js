import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookService from '../../services/BookService'

const AddBook = () => {

    const [bookName, setBookName] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const history = useNavigate();
    const { id } = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const book = { bookName, authorName, quantity, price }

        if (id) {
            BookService.updateBook(id, book).then((response) => {
                history('/')
            }).catch(error => {
                console.log(error)
            })

        } else {
            BookService.createBook(book).then((response) => {

                console.log(response.data)

                history('/');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {

        BookService.getBookById(id).then((response) => {
            setBookName(response.data.bookName)
            setAuthorName(response.data.authorName)
            setQuantity(response.data.quantity)
            setPrice(response.data.price)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if (id) {
            return <h2 className="text-center">Update Employee</h2>
        } else {
            return <h2 className="text-center">Add Employee</h2>
        }
    }

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Book Name :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter book name"
                                        name="bookName"
                                        className="form-control"
                                        value={bookName}
                                        onChange={(e) => setBookName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Author Name :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter author name"
                                        name="authorName"
                                        className="form-control"
                                        value={authorName}
                                        onChange={(e) => setAuthorName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Quantity :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter quantity"
                                        name="quantity"
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Price :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter price"
                                        name="price"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)} >Submit </button>
                                <Link to="/" className="btn btn-danger" style={{marginLeft:"5px"}}> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddBook
