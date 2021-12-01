import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import BookService from '../../services/BookService'
import {Button,Modal} from 'react-bootstrap';
import {Page, Document,pdfjs} from 'react-pdf';
import { Link } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function ViewInvoice(props){
    const [numPages, setNumPages] = useState(null);

    function fileType(){
        
        if(props.fType==='pdf'){
            return(
            <Document
                    file={`http://localhost:8082/api/v1/books/invoice/${props.id}`}
                    onLoadSuccess={({ numPages })=>setNumPages(numPages)}
                    className="view-width-pdf"
                >
                {Array.apply(null, Array(numPages))
                .map((x, i)=>i+1)
                .map(page => <Page pageNumber={page}/>)}
                </Document>
            )
        }
        else {
           return <img alt="view-imag" src={`http://localhost:8082/api/v1/books/invoice/${props.id}`} className="view-width-image" />
        }
    }
  
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Body>
                {fileType()}                
            </Modal.Body>
            <Modal.Footer><a href={`http://localhost:8082/api/v1/books/invoice/${props.id}`} class="btn btn-success" >Download</a><Button onClick={props.onHide} class="btn btn-danger" style={{backgroundColor:"#dc3545",borderColor:"#dc3545"}} >Cancel</Button></Modal.Footer>
        </Modal>
      );
}


function ViewBook() {
    const [book, setBook] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [fType,setFType]= useState('');
    let {id}=useParams();

    useEffect(() => {
        BookService.getBookById(id).then((resp)=>{
            // console.log(resp.data);
            setBook(resp.data);
        })
        .catch(err=>console.log(err))
    }, [id])

    function fileType(){
        let fType=book.invoicePath.split(".")[1];
        setFType(fType);
    }


    return (
        <div>
            <h1 className="text-center mt-3">Book Details</h1>
            <table className="table table-bordered" style={{ marginTop: "30px" }}>
                <tbody style={{ color: "black", fontSize: "18px" }}>
                    <tr>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Book Name :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{book?book.bookName:null}</td>
                    </tr>
                    <tr>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Author :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{book?book.authorName:null}</td>
                    </tr>
                    <tr>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Price :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{book?book.price:null}</td>
                    </tr>
                    <tr>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Quantity :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{book?book.quantity:null}</td>
                    </tr> 
                    <tr>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Invoice :</td>
                        <td><Button class="btn btn-success" onClick={()=>{setModalShow(true);fileType();}}>View Invoice</Button></td>
                    </tr>  

                </tbody>

            </table>
            <ViewInvoice
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                fType={fType}
            />   
             <Link to="/" className="btn btn-danger" style={{ width: "100px" }}> Back </Link>
   
        </div>
    )
}

export default ViewBook;