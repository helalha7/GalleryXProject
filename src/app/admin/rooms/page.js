'use client';

import { useState, useEffect } from 'react';
import RoomTable from '../../../components/admin/RoomTable';
import Modal from '../../../components/shared/Modal';

export default function ManageRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    position: '',
    color: '#f3f4f6'
  });
  
  // Fetch rooms from API
  const fetchRooms = async () => {
    setLoading(true);
    try {
      // In a real app, fetch from API
      // const response = await fetch('/api/rooms');
      // const data = await response.json();
      // setRooms(data);
      
      // For demo purposes, use this fallback data
      setRooms([
        {
          _id: 'room1',
          name: 'Ancient Art',
          description: 'Gallery featuring artifacts from ancient civilizations',
          artifactsCount: 24,
          lastUpdated: '2023-11-05',
          position: 'Gallery A',
          color: '#fef3c7' // yellow-100
        },
        {
          _id: 'room2',
          name: 'Modern Masterpieces',
          description: 'Contemporary art from the 20th century',
          artifactsCount: 18,
          lastUpdated: '2023-11-12',
          position: 'Gallery B',
          color: '#fce7f3' // pink-100
        }
      ]);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRooms();
  }, []);
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle edit button click
  const handleEdit = (room) => {
    setCurrentRoom(room);
    setFormData({
      name: room.name,
      description: room.description,
      position: room.position || '',
      color: room.color || '#f3f4f6'
    });
    setIsModalOpen(true);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentRoom) {
        // Update existing room
        // In a real app, send to API
        // const response = await fetch(`/api/rooms/${currentRoom._id}`, {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });
        
        // Update local state for demo
        setRooms(prev => 
          prev.map(room => 
            room._id === currentRoom._id 
              ? { ...room, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
              : room
          )
        );
      } else {
        // Create new room
        // In a real app, send to API
        // const response = await fetch('/api/rooms', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });
        
        // Update local state for demo
        const newRoom = {
          _id: `room${Date.now()}`,
          ...formData,
          artifactsCount: 0,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        setRooms(prev => [...prev, newRoom]);
      }
      
      // Close modal and reset form
      setIsModalOpen(false);
      setCurrentRoom(null);
      setFormData({
        name: '',
        description: '',
        position: '',
        color: '#f3f4f6'
      });
    } catch (err) {
      console.error('Error saving room:', err);
      alert('Failed to save room');
    }
  };
  
  // Handle add new room button click
  const handleAddNew = () => {
    setCurrentRoom(null);
    setFormData({
      name: '',
      description: '',
      position: '',
      color: '#f3f4f6'
    });
    setIsModalOpen(true);
  };
  
  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-8">Manage Museum Rooms</h1>
        <p className="text-center py-8">Loading rooms...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-8">Manage Museum Rooms</h1>
        <p className="text-center py-8 text-red-600 dark:text-red-400">{error}</p>
        <button 
          onClick={fetchRooms}
          className="mx-auto block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Manage Museum Rooms</h1>
        
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add New Room
        </button>
      </div>
      
      <RoomTable 
        rooms={rooms} 
        onEdit={handleEdit} 
        onDelete={(id) => {
          // In a real app, send DELETE request to API
          setRooms(prev => prev.filter(room => room._id !== id));
        }}
        onRefresh={fetchRooms}
      />
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentRoom ? `Edit Room: ${currentRoom.name}` : 'Add New Room'}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-black mb-2">
              Room Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 dark:text-black mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="input-field"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="position" className="block text-gray-700 dark:text-black mb-2">
                Position (e.g., "Gallery A")
              </label>
              <input
                id="position"
                name="position"
                type="text"
                className="input-field"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="color" className="block text-gray-700 dark:text-black mb-2">
                Display Color
              </label>
              <input
                id="color"
                name="color"
                type="color"
                className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {currentRoom ? 'Update Room' : 'Create Room'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}