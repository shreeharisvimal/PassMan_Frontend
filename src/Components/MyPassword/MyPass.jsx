import React, { useState, useEffect } from 'react';
import { AuthAxios } from '../../Api/Axios';
import './MyPass.css'; // Import the CSS file

function MyPass() {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await AuthAxios.get('password/new_password');
        if (response.status === 200) {
          setPasswords(response.data.passwords); // Ensure 'passwords' matches the API response key
        }
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    };

    fetchPasswords();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await AuthAxios.delete(`password/${id}/`); // Adjust endpoint as needed
      if (response.status === 204) {
        setPasswords(passwords.filter(password => password.id !== id));
      }
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="password-container">
        <h2 className="password-title">Stored Passwords</h2>
        <table className="password-table">
          <thead>
            <tr>
              <th>App Name</th>
              <th>Password</th>
              <th>Date Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password) => (
              <tr key={password.id} className="password-card">
                <td>{password.app_name}</td>
                <td>{password.password}</td>
                <td>{new Date(password.created_at).toLocaleDateString()}</td>
                <td>
                  <button className="noselect" onClick={() => handleDelete(password.id)}>
                    <span className="text">Delete</span>
                    <span className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyPass;
