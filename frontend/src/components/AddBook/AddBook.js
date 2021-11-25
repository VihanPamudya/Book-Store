import React, { useState, useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import BookService from '../../services/BookService'
import { Form, Button } from 'react-bootstrap'

function AddBook (){

    const [bookName, setBookName] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [invoice, setInvoice] = useState();
    const history = useNavigate();
    const { id } = useParams();
    
    function saveBook(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bookName", bookName);
        formData.append("authorName", authorName);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("file", invoice);

        
        if (id) {
            BookService.updateBook(id, formData).then((response) => {
                history('/')
            }).catch(error => {
                console.log(error)
            })

        }else{
            BookService.saveBook(formData).then((response) => {
                console.log(response.data);
                history('/');
            })
                .catch(error => {
                    console.log(error)
                })
        }
    }


    useEffect(() => {

        BookService.getBookById(id).then((response) => {
            console.log(response)
            setBookName(response.data.bookName)
            setAuthorName(response.data.authorName)
            setQuantity(response.data.quantity)
            setPrice(response.data.price)
            setInvoice(response.data.file)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    const title = () => {

        if (id) {
            return <h2 className="text-center">Update Book</h2>
        } else {
            return <h2 className="text-center">Add Book</h2>
        }
    }

    const submitorUpdate=()=>{
        if(id){
            return <Button className="btn btn-success" type="submit" onClick={(e)=>saveBook(e)}>Update</Button>
        }
        else {
            return <Button className="btn btn-success" type="submit" onClick={(e)=>saveBook(e)}>Submit</Button>
        }
    }

    return (
        <div>
            <div className="container">
                <h2 className="text-center mt-3">{title()}</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="bookName">
                        <Form.Label>Book Name :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter book name"
                            name="bookName"
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}

                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="authorName">
                        <Form.Label> Author Name :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author name"
                            name="authorName"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label> Quantity :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label> Price :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="invoice" className="mb-3">
                        <Form.Label>Upload the Invoice :</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="file"
                            onChange={(e)=>setInvoice(e.target.files[0])}
                        />
                    </Form.Group>

                    {submitorUpdate()}
                    <Link to="/" className="btn btn-danger" style={{ marginLeft: "5px" }}> Cancel </Link>
                </Form>

            </div>
        </div>
    )
}

export default AddBook
