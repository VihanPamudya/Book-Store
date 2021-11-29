import axios from 'axios'

const BOOK_BASE_REST_API_URL = 'http://localhost:8082/books';

class BookService {

    getAllBooks() {
        return axios.get(BOOK_BASE_REST_API_URL)
    }

    saveBook(formData) {
        return axios.post(BOOK_BASE_REST_API_URL, formData);
    }

    getBookById(bookId) {
        return axios.get(BOOK_BASE_REST_API_URL + '/' + bookId);
    }

    updateBook(bookId, formData) {
        return axios.put(BOOK_BASE_REST_API_URL + '/' + bookId, formData);
    }

    deleteBook(bookId) {
        return axios.delete(BOOK_BASE_REST_API_URL + '/' + bookId);
    }
}

export default new BookService();