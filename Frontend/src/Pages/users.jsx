import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/auth/users");
        setUsers(response.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {users.map((user) => (
          <div 
            key={user._id || user.email}
            style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{user.username}</div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users; 