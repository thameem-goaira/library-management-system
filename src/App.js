import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Books'
import BorrowBook from './components/BorrowBook'
import BorrowingHistory from './components/BorrowingHistory'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import ReturnBook from './components/ReturnBook'
import Users from './components/Users'
import './App.css'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/users' element={<Users />} />
        <Route path='/history' element={<BorrowingHistory />} />
        <Route path='/borrow' element={<BorrowBook />} />
        <Route path='/return' element={<ReturnBook />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App