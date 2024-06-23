import React, { useState, useEffect, useId } from 'react';
import { booksData } from '../../_mock/data';
import './BooksTable.css';
import BorrowBook from '../BorrowBook';
import ReturnBook from '../ReturnBook';

function Books() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    author: '',
    isbn: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const dynamicId = useId();
  // console.log("searchTerm",searchTerm);
  // console.log("booksPerPage",booksPerPage);
  useEffect(() => {
    setBooks(booksData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.isbn) newErrors.isbn = 'ISBN is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    else if (isNaN(formData.quantity)) newErrors.quantity = 'Quantity must be a number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {

    if (!validateForm()) return;

    if (isEdit) {
      setBooks(books.map(book => book.id === formData.id ? formData : book));
    } else {
      const newBook = { ...formData, id: dynamicId + Math.random() };
      console.log('newBook', newBook)
      setBooks([...books, newBook]);
      console.log('setBooks', books)

    }
    setShowModal(false);
  };

  const addBook = () => {
    setIsEdit(false);
    setFormData({
      id: null,
      title: '',
      author: '',
      isbn: '',
      quantity: ''
    });
    setErrors({});
    setShowModal(true);
  };

  const editBook = (id) => {
    const book = books.find(book => book.id === id);
    setFormData(book);
    setIsEdit(true);
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: null,
      title: '',
      author: '',
      isbn: '',
      quantity: ''
    });
    setErrors({});
  };
  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
    setShowDeleteModal(false);
  };

  const handleDeleteClick = (id) => {
    setBookToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log('paginate', paginate);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div>
      <div className='books-header'>
        <h2>Books</h2>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1);
            }}
          />
        </div>
        <div className='main-header'>

          <button className="add-book-button" onClick={addBook}>Add Book</button>
          <BorrowBook setBooks={setBooks} books={books} />
          <ReturnBook setBooks={setBooks} books={books} />
        </div>
      </div>
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id}>
              <td data-label="Title">{book.title}</td>
              <td data-label="Author">{book.author}</td>
              <td data-label="ISBN">{book.isbn}</td>
              <td data-label="Quantity">{book.quantity}</td>
              <td data-label="Actions" className='button-container' >
                <button className='button' onClick={() => editBook(book.id)}>Edit</button>
                <button className='delete-button' onClick={() => handleDeleteClick(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="page-button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span className="page-info">{currentPage} of {totalPages}</span>
        <button className="page-button" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>{isEdit ? 'Edit Book' : 'Add Book'}</h2>
            <form onSubmit={e => e.preventDefault()}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p className="error">{errors.title}</p>}
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
              {errors.author && <p className="error">{errors.author}</p>}
              <label>ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
              />
              {errors.isbn && <p className="error">{errors.isbn}</p>}
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <p className="error">{errors.quantity}</p>}
            </form>
            <button className="confirm-button" onClick={handleSubmit}>Save</button>
            <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseDeleteModal}>&times;</span>
            <p>Are you sure you want to delete this book?</p>
            <button className="confirm-button" onClick={() => deleteBook(bookToDelete)}>Yes</button>
            <button className="cancel-button" onClick={handleCloseDeleteModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
