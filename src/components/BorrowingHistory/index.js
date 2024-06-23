import React, { useState, useEffect } from 'react';
import './BorrowingHistory.css'
// import BorrowBook from '../BorrowBook';
function BorrowingHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/borrowingHistoryData.json')
      .then(response => {
        console.log('response', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setHistory(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Borrowing History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index}>
              <td data-label="User ID">{record.userId}</td>
              <td data-label="Book ID">{record.bookId}</td>
              <td data-label="Borrow Date">{record.borrowDate}</td>
              <td data-label="Return Date">{record.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingHistory;
