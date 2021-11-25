import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import BookService from '../../services/BookService';
import { Link } from 'react-router-dom'


function ViewBook() {
    const [book, setBook] = useState();
  //  const [file, setFile] = useState();
  const { id } = useParams();

    useEffect(() => {
        BookService.getBookById(id).then((response)=>{
            console.log(response);
            setBook(response.data);
        })
        .catch(err=>console.log(err))
    }, [id])


    return (
        <div className="bv">
            <h1 className="text-center mt-3">Book Details</h1>
            <table className="table table-bordered" style={{marginTop:"80px"}}>
                <tbody  style={{color:"black", fontSize:"18px"}}>
                    <tr>
                        <td className="tb" style={{paddingTop:"10px", paddingBottom:"10px" ,fontWeight:"bold"}}>Book Name</td>
                        <td style={{paddingTop:"10px", paddingBottom:"10px"}}>{book?book.bookName:null}</td>
                    </tr>
                    <tr>
                        <td className="tb" style={{paddingTop:"10px", paddingBottom:"10px" ,fontWeight:"bold"}}>Author</td>
                        <td style={{paddingTop:"10px", paddingBottom:"10px"}}>{book?book.authorName:null}</td>
                    </tr>
                    <tr>
                        <td className="tb" style={{paddingTop:"10px", paddingBottom:"10px" ,fontWeight:"bold"}}>Price</td>
                        <td style={{paddingTop:"10px", paddingBottom:"10px"}}>{book?book.price:null}</td>
                    </tr>
                    <tr>
                        <td className="tb" style={{paddingTop:"10px", paddingBottom:"10px" ,fontWeight:"bold"}}>Quantity</td>
                        <td style={{paddingTop:"10px", paddingBottom:"10px"}}>{book?book.quantity:null}</td>
                    </tr> 
                    <tr>
                        <td className="tb" style={{paddingTop:"10px", paddingBottom:"10px" ,fontWeight:"bold"}}>Invoice</td> 
                        <td style={{paddingTop:"10px", paddingBottom:"10px"}}><a href={`http://localhost:8082/books/invoice/${id}`} class="btn btn-primary active" aria-current="page">Download Invoice</a></td>
                    </tr>  

                </tbody>

            </table>
            <Link to="/" className="btn btn-danger" style={{ width:"80px" }}> Back </Link>
            
        </div>
    )
}

export default ViewBook;