import React, { useState, useEffect, useId } from 'react';
import { booksData, usersData } from '../../_mock/data';
import './../Books/BooksTable.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    membershipId: '',
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const dynamicId = useId();

  useEffect(() => {
    setUsers(usersData);
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
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.membershipId) newErrors.membershipId = 'MembershipId is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isEdit) {
      setUsers(users.map(user => user.id === formData.id ? formData : user));
    } else {
      const newUser = { ...formData, id: dynamicId + Math.random() };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const addUsers = () => {
    setIsEdit(false);
    setFormData({
      id: null,
      name: '',
      email: '',
      membershipId: ''
    });
    setErrors({});
    setShowModal(true);
  };

  const editUser = (id) => {
    const user = users.find(user => user.id === id);
    setFormData(user);
    setIsEdit(true);
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: null,
      name: '',
      email: '',
      membershipId: '',
    });
    setErrors({});
  };
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setShowDeleteModal(false);
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  console.log('filteredUsers', filteredUsers);

  const indexOfLastUser = currentPage * usersPerPage;
  // console.log('indexOfLastUser',indexOfLastUser);
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // console.log('indexOfFirstUser',indexOfFirstUser);
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // console.log('currentUsers',currentUsers);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log('paginate', paginate);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  console.log('totalPages', totalPages);

  return (
    <div>
      <div className='books-header'>
        <h2>Users</h2>
        <div className='main-header'>
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="add-book-button" onClick={addUsers}>Add User</button>
        </div>
      </div>
      <table className="books-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>MembershipId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td data-label="Title">{user.name}</td>
              <td data-label="Author">{user.email}</td>
              <td data-label="ISBN">{user.membershipId}</td>
              <td data-label="Actions" className='button-container' >
                <button className='button' onClick={() => editUser(user.id)}>Edit</button>
                <button className='delete-button' onClick={() => handleDeleteClick(user.id)}>Delete</button>
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
            <h2>{isEdit ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={e => e.preventDefault()}>

              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <label>MembershipId</label>
              <input
                type="text"
                name="membershipId"
                value={formData.membershipId}
                onChange={handleChange}
              />
              {errors.membershipId && <p className="error">{errors.membershipId}</p>}
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
            <p>Are you sure you want to delete this user?</p>
            <button className="confirm-button" onClick={() => deleteUser(userToDelete)}>Yes</button>
            <button className="cancel-button" onClick={handleCloseDeleteModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
