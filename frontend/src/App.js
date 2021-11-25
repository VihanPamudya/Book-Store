import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllBookList from './components/AllBookList/AllBookList';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AddBook from './components/AddBook/AddBook';
import './App.css';
import ViewBook from './components/ViewBook/ViewBook';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<AllBookList />} />
            <Route path="/add-book" element={<AddBook />}></Route>
            <Route path="/edit-book/:id" element={<AddBook />}></Route>
            <Route path="/view-book/:id" element={<ViewBook />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
