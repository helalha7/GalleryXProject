'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../../components/shared/Header';
import ArtifactCard from '../../../../components/artifact/ArtifactCard';
import ArtifactDetail from '../../../../components/artifact/ArtifactDetail';
import InteractiveGallery from '@/components/gallery/InteractiveGallery';
import Modal from '../../../../components/shared/Modal';
import Link from 'next/link';

// Hardcoded artifacts for each gallery to ensure they always display


// Maps gallery IDs to human-readable names
const GALLERY_NAME_MAP = {
  // MongoDB IDs to names
  '6831122db8950075ef2a8d2': 'Modern Masterpieces',
  
  // Predefined galleries
  'ancient-art': 'Ancient Art',
  'modern-masterpieces': 'Modern Masterpieces',
  'special-exhibitions': 'Special Exhibitions',
  'contemporary-art': 'Contemporary Art',
  'gallery-a': 'Gallery A',
};

// Function to convert ID to readable name
function getGalleryName(id) {
  // Check if ID is in our map
  if (GALLERY_NAME_MAP[id]) {
    return GALLERY_NAME_MAP[id];
  }
  
  // Otherwise, try to format the ID into a readable name
  if (typeof id === 'string') {
    // If it looks like a MongoDB ObjectId (24 hex chars), use a default name
    if (/^[0-9a-f]{24}$/i.test(id)) {
      return 'Gallery Collection';
    }
    
    // Format kebab case to title case
    return id.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  return 'Gallery';
}

// Gallery image mapping
const GALLERY_IMAGES = {
  'gallery-a': '/images/galleryA.jpg'
};

export default function GalleryPage() {
  const params = useParams();
  const router = useRouter();
  
  // Safely get the ID from params
  const id = params && params.id ? String(params.id) : 'unknown-gallery';
  
  const [user, setUser] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [needsTicket, setNeedsTicket] = useState(false);
  const [ticketExpired, setTicketExpired] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  // Check authentication and load data
  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is logged in
      const storedUser = sessionStorage.getItem('user');
      if (!storedUser) {
        router.push('/login?redirect=/explore/gallery/' + id);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Check if user has a ticket or is an admin
        const hasTicket = parsedUser.hasPurchasedTicket === true;
        const isAdmin = parsedUser.role === 'admin';
        
        // If not admin and doesn't have ticket, show ticket purchase prompt
        if (!isAdmin && !hasTicket) {
          setNeedsTicket(true);
          setLoading(false);
          return;
        }
        
      } catch (e) {
        console.error('Error parsing user from session:', e);
        router.push('/login');
        return;
      }

      // Always set guaranteed artifacts for the gallery
      const galleryKey = id.toLowerCase();
      
      // Use guaranteed artifacts if available, otherwise create default ones
      if (GUARANTEED_ARTIFACTS[galleryKey]) {
        setArtifacts(GUARANTEED_ARTIFACTS[galleryKey]);
      } else {
        // For any gallery not in our hardcoded list, provide default artifacts
        setArtifacts([
          {
            _id: `default-artifact-${id}-1`,
            name: 'Artifact 1',
            description: 'This is an example artifact in this gallery.',
            imageUrl: '/images/placeholder.jpg',
            artist: 'Museum Artist',
            createdYear: '2023',
            gallery: getGalleryName(id),
            views: 100
          },
          {
            _id: `default-artifact-${id}-2`,
            name: 'Artifact 2',
            description: 'Another example artifact in this gallery.',
            imageUrl: '/images/placeholder.jpg',
            artist: 'Museum Artist',
            createdYear: '2023',
            gallery: getGalleryName(id),
            views: 80
          }
        ]);
      }
      
      // Set gallery name and description
      const galleryName = getGalleryName(id);
      
      setGallery({
        _id: id,
        name: galleryName,
        description: `Explore the fascinating collection in our ${galleryName} gallery.`
      });
      
      // Set view mode based on gallery
      if (id === 'gallery-a') {
        setViewMode('interactive');
      } else {
        setViewMode('grid');
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [id, router]);
  
  // Open artifact detail modal
  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };
  
  // Handle navigation back to museum map
  const handleBackClick = () => {
    router.push('/explore');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-200">
        <Header user={user} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-white">Loading gallery...</p>
          </div>
        </main>
      </div>
    );
  }
  
  // Show ticket purchase prompt if needed
  if (needsTicket) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-200">
        <Header user={user} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-display font-bold mb-4 text-white">
              {ticketExpired ? 'Your Ticket Has Expired' : 'Purchase a Ticket'}
            </h1>
            <p className="mb-6 text-gray-400">
              {ticketExpired 
                ? 'Your virtual tour pass has expired. Please purchase a new ticket to continue exploring the museum.'
                : 'You need a virtual tour pass to access the museum galleries.'}
            </p>
            <Link 
              href="/tickets" 
              className="btn-primary py-3 px-6"
            >
              {ticketExpired ? 'Renew Ticket' : 'Buy Ticket'}
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  if (error || !gallery) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-200">
        <Header user={user} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-400">
              {error || "Gallery not found"}
            </p>
            <button
              onClick={handleBackClick}
              className="mt-4 btn-primary"
            >
              Return to Museum Map
            </button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header user={user} />
      
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-black">
              {gallery?.name || 'Gallery'}
            </h1>
            
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Back to Museum Map
            </button>
          </div>
          
          <p className="text-gray-400 mb-8">
            {gallery?.description || 'Explore the artifacts in this gallery.'}
          </p>
          
            <div className="p-8 bg-gray-200 border border-white rounded-lg">
            {viewMode === 'interactive' ? (
              <InteractiveGallery 
                galleryImage={GALLERY_IMAGES[id] || '/images/placeholder.jpg'} 
                artifacts={artifacts}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artifacts.map((artifact) => (
                  <ArtifactCard 
                    key={artifact._id || `artifact-${Math.random()}`} 
                    artifact={artifact} 
                    onClick={() => handleArtifactClick(artifact)}
                  />
                ))}
              </div>
          )}
          </div>
        </div>
      </main>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedArtifact?.name || 'Artifact Details'}
      >
        <ArtifactDetail artifact={selectedArtifact} />
      </Modal>
    </div>
  );
}

