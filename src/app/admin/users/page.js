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

  if (loading) return <p className="p-6 text-gray-500 dark:text-gray-300">Loading users...</p>;
  if (error) return <p className="p-6 text-red-600 dark:text-red-400">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#111827] dark:text-white">All Users</h1>

      {/* Search */}
      <div className="mb-4 flex flex-wrap space-x-2">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by username..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600/30 rounded text-black dark:text-white bg-white dark:bg-gray-800"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={resetList}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
        <table className="min-w-full border border-gray-300 dark:border-gray-600/30">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left p-2 text-[#111827] dark:text-white">Full Name</th>
              <th className="text-left p-2 text-[#111827] dark:text-white">Email</th>
              <th className="text-left p-2 text-[#111827] dark:text-white">Username</th>
              <th className="text-left p-2 text-[#111827] dark:text-white">Role</th>
              <th className="text-left p-2 text-[#111827] dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t dark:border-gray-600/30">
                <td className="p-2 text-[#111827] dark:text-gray-300">{user.fullName}</td>
                <td className="p-2 text-[#111827] dark:text-gray-300">{user.email}</td>
                <td className="p-2 text-[#111827] dark:text-gray-300">{user.username}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-600/20 dark:text-gray-300'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white dark:bg-gradient-to-b dark:from-gray-700/50 dark:to-gray-800/50 p-6 rounded shadow-lg w-[400px] text-black dark:text-white">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                className="w-full border border-gray-300 dark:border-gray-600/30 px-3 py-2 rounded mt-1 bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full border border-gray-300 dark:border-gray-600/30 px-3 py-2 rounded mt-1 bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="w-full border border-gray-300 dark:border-gray-600/30 px-3 py-2 rounded mt-1 bg-white dark:bg-gray-800 text-black dark:text-white"
              >
                <option value="visitor">Visitor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white rounded"
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
