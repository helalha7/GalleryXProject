'use client';

import { useEffect, useState } from 'react';
import {
  fetchAllUsers,
  fetchUserByUsername,
  deleteUser,
  updateUser,
} from '@/lib/api/user';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', role: 'visitor' });

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      setError('No auth token found');
      setLoading(false);
      return;
    }

    fetchAllUsers(token)
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const result = await fetchUserByUsername(searchTerm, token);
      setUsers([result]);
    } catch (err) {
      setError(`User not found: ${searchTerm}`);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteUser(userId, token);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const resetList = async () => {
    setError(null);
    setSearchTerm('');
    setLoading(true);
    fetchAllUsers(token)
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updated = await updateUser(editUser._id, formData, token);
      setUsers((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u))
      );
      setEditUser(null);
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading users...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">All Users</h1>

      {/* Search */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by username..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={resetList}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* User Table */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 text-black">Full Name</th>
            <th className="text-left p-2 text-black">Email</th>
            <th className="text-left p-2 text-black">Username</th>
            <th className="text-left p-2 text-black">Role</th>
            <th className="text-left p-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2 text-black">{user.fullName}</td>
              <td className="p-2 text-black">{user.email}</td>
              <td className="p-2 text-black">{user.username}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    user.role === 'admin'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px] text-black">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              >
                <option value="visitor">Visitor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
