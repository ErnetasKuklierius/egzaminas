import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', isBlocked: false },
    { id: 2, username: 'user2', isBlocked: false },
  ]);
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1', isApproved: null },
    { id: 2, title: 'Event 2', isApproved: true },
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); 
  };

  const blockUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBlocked: true } : user
    ));
    setBlockedUsers([...blockedUsers, users.find(user => user.id === userId)]);
  };

  const unblockUser = (userId) => {
    setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBlocked: false } : user
    ));
  };

  const approveEvent = (eventId) => {
    setEvents(events.map(item => 
      item.id === eventId ? { ...item, isApproved: true } : item
    ));
  };

  const rejectEvent = (eventId) => {
    setEvents(events.map(item => 
      item.id === eventId ? { ...item, isApproved: false } : item
    ));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const newCat = { id: categories.length + 1, name: newCategory };
    setCategories([...categories, newCat]);
    setNewCategory('');
  };

  return (
    <div className="container mx-auto py-10">
      <button 
        onClick={handleLogout} 
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold mb-5">Admin Panel</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Manage Users</h2>
        <div className="bg-gray-100 p-5 rounded-md">
          {users.map(user => (
            <div key={user.id} className="flex justify-between items-center mb-2">
              <span>{user.username}</span>
              {!user.isBlocked && (
                <button
                  onClick={() => blockUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Block User
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Blocked Users</h2>
        <div className="bg-gray-100 p-5 rounded-md">
          {blockedUsers.map(user => (
            <div key={user.id} className="flex justify-between items-center mb-2">
              <span>{user.username}</span>
              <button
                onClick={() => unblockUser(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-md"
              >
                Unblock User
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Manage Events</h2>
        <div className="bg-gray-100 p-5 rounded-md">
          {events.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>
                {item.title} 
                {item.isApproved === null ? ' (Waiting for approval)' : 
                 item.isApproved ? ' (Approved)' : ' (Rejected)'}
              </span>
              <div className="space-x-2">
                {item.isApproved === null && (
                  <>
                    <button
                      onClick={() => approveEvent(item.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                      Approve Event
                    </button>
                    <button
                      onClick={() => rejectEvent(item.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    >
                      Reject Event
                    </button>
                  </>
                )}
                {item.isApproved === false && (
                  <button
                    onClick={() => approveEvent(item.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Approve Event
                  </button>
                )}
                {item.isApproved === true && (
                  <button
                    onClick={() => rejectEvent(item.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject Event
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Manage Categories</h2>
        <form onSubmit={handleAddCategory} className="mb-5">
          <input 
            type="text" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            placeholder="New Category" 
            className="border p-2 rounded mr-2"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </form>
        <div className="bg-gray-100 p-5 rounded-md">
          {categories.map(category => (
            <div key={category.id} className="mb-2">
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;