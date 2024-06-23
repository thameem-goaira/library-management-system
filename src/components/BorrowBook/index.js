import React, { useState } from 'react';
import './BorrowBook.css';

function BorrowBook({ setBooks, books }) {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [errors, setErrors] = useState({});
  console.log('userId', userId);
  console.log('bookId', bookId);
  console.log('books', books);
  const handleBorrow = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!userId) {
      validationErrors.userId = 'User ID is required';
    }
    if (!bookId) {
      validationErrors.bookId = 'Book selection is required';
    }
    if (Object.keys(validationErrors).length === 0) {
      const selectedBook = books.find(book => book.id === parseInt(bookId));

      if (selectedBook) {
        if (selectedBook.quantity > 0) {
          console.log(`Borrowing Book ID: ${bookId} by User ID: ${userId}`);

          const updatedbooks = books.map(book =>
            book.id === parseInt(bookId) ? { ...book, quantity: book.quantity - 1 } : book
          );

          console.log('Updated Books Data:', updatedbooks);
          setBooks(updatedbooks);
          alert(`The ${selectedBook.title} Book Quantity Successfully Update`)
          handleCloseModal();
        } else {
          validationErrors.bookId = 'Selected book is out of stock';
        }
      } else {
        validationErrors.bookId = 'Invalid book selection';
      }
    }

    setErrors(validationErrors);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
    setUserId('');
    setBookId('');
  };

  return (
    <div>
      <button className='borrow-button' onClick={handleOpenModal}>Borrow Book</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>Borrow Book</h2>
            <form onSubmit={handleBorrow}>
              <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
                <option value="">Select a book</option>
                {books.map(book => (
                  <option key={book.id} value={book.id} disabled={book.quantity === 0}>{book.title}</option>
                ))}
              </select>
              {errors.bookId && <p className="error">{errors.bookId}</p>}
              <label>User ID</label>
              <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
              {errors.userId && <p className="error">{errors.userId}</p>}
              <button className="confirm-button" type="submit">Borrow</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BorrowBook;
