'use client';

import { useState, useEffect } from 'react';
import ArtifactTable from '../../../components/admin/ArtifactTable';
import Modal from '../../../components/shared/Modal';

export default function ManageArtifactsPage() {
  const [artifacts, setArtifacts] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    gallery: '',
    artist: '',
    createdYear: '',
    additionalInfo: '',
    audioUrl: '',
    isOnDisplay: true
  });
  
  // Fetch artifacts and galleries from API
  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real app, fetch from API
      // const artifactsResponse = await fetch('/api/artifacts');
      // const artifactsData = await artifactsResponse.json();
      // setArtifacts(artifactsData);
      
      // const galleriesResponse = await fetch('/api/galleries');
      // const galleriesData = await galleriesResponse.json();
      // setGalleries(galleriesData);
      
      // For demo purposes, use this fallback data
      setArtifacts([
        {
          _id: 'artifact1',
          name: 'Ancient Vase',
          description: 'A ceramic vase from the 5th century BC, featuring red-figure decoration showing mythological scenes.',
          imageUrl: '/images/ancient-vase.jpg',
          gallery: 'Ancient Art',
          artist: 'Unknown Greek Artist',
          createdYear: '5th Century BC',
          dateAdded: '2023-09-15',
          views: 346
        },
        {
          _id: 'artifact2',
          name: 'Modern Sculpture',
          description: 'An abstract modernist sculpture exploring themes of movement and form.',
          imageUrl: '/images/modern-sculpture.jpg',
          gallery: 'Modern Masterpieces',
          artist: 'Jean Durant',
          createdYear: '1965',
          dateAdded: '2023-10-02',
          views: 289
        }
      ]);
      
      setGalleries([
        { _id: 'gallery1', name: 'Ancient Art' },
        { _id: 'gallery2', name: 'Modern Masterpieces' },
        { _id: 'gallery3', name: 'Contemporary Art' },
        { _id: 'gallery4', name: 'Special Exhibitions' }
      ]);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load artifacts and galleries');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle edit button click
  const handleEdit = (artifact) => {
    setCurrentArtifact(artifact);
    setFormData({
      name: artifact.name,
      description: artifact.description,
      imageUrl: artifact.imageUrl || '',
      gallery: artifact.gallery || '',
      artist: artifact.artist || '',
      createdYear: artifact.createdYear || '',
      additionalInfo: artifact.additionalInfo || '',
      audioUrl: artifact.audioUrl || '',
      isOnDisplay: artifact.isOnDisplay !== false
    });
    setIsModalOpen(true);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentArtifact) {
        // Update existing artifact
        // In a real app, send to API
        // const response = await fetch(`/api/artifacts/${currentArtifact._id}`, {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });
        
        // Update local state for demo
        setArtifacts(prev => 
          prev.map(artifact => 
            artifact._id === currentArtifact._id 
              ? { ...artifact, ...formData }
              : artifact
          )
        );
      } else {
        // Create new artifact
        // In a real app, send to API
        // const response = await fetch('/api/artifacts', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });
        
        // Update local state for demo
        const newArtifact = {
          _id: `artifact${Date.now()}`,
          ...formData,
          dateAdded: new Date().toISOString().split('T')[0],
          views: 0
        };
        
        setArtifacts(prev => [...prev, newArtifact]);
      }
      
      // Close modal and reset form
      setIsModalOpen(false);
      setCurrentArtifact(null);
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        gallery: '',
        artist: '',
        createdYear: '',
        additionalInfo: '',
        audioUrl: '',
        isOnDisplay: true
      });
    } catch (err) {
      console.error('Error saving artifact:', err);
      alert('Failed to save artifact');
    }
  };
  
  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-8">Manage Artifacts</h1>
        <p className="text-center py-8">Loading artifacts...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-8">Manage Artifacts</h1>
        <p className="text-center py-8 text-red-600 dark:text-red-400">{error}</p>
        <button 
          onClick={fetchData}
          className="mx-auto block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-display font-bold mb-8">Manage Artifacts</h1>
      
      <ArtifactTable 
        artifacts={artifacts} 
        onEdit={handleEdit} 
        onDelete={(id) => {
          // In a real app, send DELETE request to API
          setArtifacts(prev => prev.filter(artifact => artifact._id !== id));
        }}
        onRefresh={fetchData}
      />
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentArtifact ? `Edit Artifact: ${currentArtifact.name}` : 'Add New Artifact'}
      >
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto p-2">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
              Artifact Name *
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="gallery" className="block text-gray-700 dark:text-gray-300 mb-2">
                Gallery/Room *
              </label>
              <select
                id="gallery"
                name="gallery"
                className="input-field"
                value={formData.gallery}
                onChange={handleChange}
                required
              >
                <option value="">Select a gallery</option>
                {galleries.map(gallery => (
                  <option key={gallery._id} value={gallery.name}>
                    {gallery.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="isOnDisplay" className="block text-gray-700 dark:text-gray-300 mb-2">
                Display Status
              </label>
              <div className="flex items-center mt-3">
                <input
                  id="isOnDisplay"
                  name="isOnDisplay"
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.isOnDisplay}
                  onChange={handleChange}
                />
                <label htmlFor="isOnDisplay" className="ml-2 text-gray-700 dark:text-gray-300">
                  Currently on display
                </label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="artist" className="block text-gray-700 dark:text-gray-300 mb-2">
                Artist/Creator
              </label>
              <input
                id="artist"
                name="artist"
                type="text"
                className="input-field"
                value={formData.artist}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="createdYear" className="block text-gray-700 dark:text-gray-300 mb-2">
                Year/Period Created
              </label>
              <input
                id="createdYear"
                name="createdYear"
                type="text"
                className="input-field"
                value={formData.createdYear}
                onChange={handleChange}
                placeholder="e.g., 1885 or 5th Century BCE"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              className="input-field"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="audioUrl" className="block text-gray-700 dark:text-gray-300 mb-2">
              Audio Tour URL (optional)
            </label>
            <input
              id="audioUrl"
              name="audioUrl"
              type="url"
              className="input-field"
              value={formData.audioUrl}
              onChange={handleChange}
              placeholder="https://example.com/audio.mp3"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-2">
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
          
          <div className="mb-6">
            <label htmlFor="additionalInfo" className="block text-gray-700 dark:text-gray-300 mb-2">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              rows="3"
              className="input-field"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Historical context, interesting facts, etc."
            ></textarea>
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
              {currentArtifact ? 'Update Artifact' : 'Create Artifact'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}