import React, { useEffect, useState } from "react";
import {deleteUser, fetchUsers} from '../../api/AdminApi'
import "./Admin.css";

const Admin = () => {
const [users, setUsers] = useState([]);

// Fetch users on component mount
useEffect(() => {
  fetchUsers()
    .then((data) => {
      setUsers(data);
    })
    .catch((error) => {
      console.error("Failed to fetch users:", error);
    });
}, []);

// Function to handle delete user
const handleDeleteUser = async (userId) => {
  try {
    await deleteUser(userId);
    // Refresh users list after deletion
    const updatedUsers = users.filter((user) => user.uid !== userId);
    setUsers(updatedUsers);
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

  return (
    <div className="admin">
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <ul id="ul-admin">
          {users.map((user) => (
            <li id="li-admin" key={user.uid}>
              {user.email}
              <button
                onClick={() => handleDeleteUser(user.uid)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
