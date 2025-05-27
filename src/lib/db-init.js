import clientPromise from './mongodb';

/**
 * Initialize the database with required collections and default data
 * Call this function from an API route or server component
 */
export async function initializeDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Create galleries collection if it doesn't exist
    if (!collectionNames.includes('galleries')) {
      await db.createCollection('galleries');
      
      // Add some default galleries
      await db.collection('galleries').insertMany([
        {
          name: 'Ancient Art',
          description: 'Gallery featuring artifacts from ancient civilizations',
          position: 'Gallery A',
          color: '#fef3c7',
          artifactsCount: 2,
          lastUpdated: new Date(),
          isActive: true
        },
        {
          name: 'Modern Masterpieces',
          description: 'Contemporary art from the 20th century',
          position: 'Gallery B',
          color: '#fce7f3',
          artifactsCount: 1,
          lastUpdated: new Date(),
          isActive: true
        },
        {
          name: 'Special Exhibitions',
          description: 'Limited-time special exhibitions and featured collections',
          position: 'Gallery F',
          color: '#d1fae5',
          artifactsCount: 1,
          lastUpdated: new Date(),
          isActive: true
        },
        {
          name: 'Contemporary Art',
          description: 'Cutting-edge works from today\'s leading artists',
          position: 'Gallery C',
          color: '#dbeafe',
          artifactsCount: 1,
          lastUpdated: new Date(),
          isActive: true
        }
      ]);
    }
    
    // Create artifacts collection if it doesn't exist
    if (!collectionNames.includes('artifacts')) {
      await db.createCollection('artifacts');
      
      // Add some default artifacts
      await db.collection('artifacts').insertMany([
        {
          name: 'Roman Sculpture',
          description: 'A marble bust of a Roman senator from the 1st century CE. The realistic portrayal captures the dignity and authority of the Roman elite.',
          shortDescription: 'Roman marble bust from 1st century CE',
          imageUrl: '/images/placeholder.jpg',
          gallery: 'Ancient Art',
          createdYear: '50 CE',
          artist: 'Unknown Roman Artist',
          additionalInfo: 'Roman portraiture was revolutionary for its realism, often depicting subjects with their actual features rather than idealized versions.',
          audioUrl: '/audio/placeholder.mp3',
          isOnDisplay: true,
          dateAdded: new Date(),
          views: 346
        },
        {
          name: 'Egyptian Scarab',
          description: 'A carved scarab beetle amulet from the New Kingdom period. Scarabs were important symbols of rebirth and regeneration in ancient Egyptian culture.',
          shortDescription: 'Egyptian scarab amulet from New Kingdom period',
          imageUrl: '/images/placeholder.jpg',
          gallery: 'Ancient Art',
          createdYear: '1400 BCE',
          artist: 'Unknown Egyptian Artisan',
          isOnDisplay: true,
          dateAdded: new Date(),
          views: 275
        },
        {
          name: 'Starry Night',
          description: 'One of Vincent van Gogh\'s most famous works, painted in June 1889. It depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence.',
          shortDescription: 'Vincent van Gogh\'s masterpiece from 1889',
          imageUrl: '/images/placeholder.jpg',
          gallery: 'Modern Masterpieces',
          createdYear: '1889',
          artist: 'Vincent van Gogh',
          additionalInfo: 'Van Gogh painted this while in the asylum at Saint-Rémy, and the swirling patterns reflect his emotional turbulence and unique artistic vision.',
          audioUrl: '/audio/placeholder.mp3',
          isOnDisplay: true,
          dateAdded: new Date(),
          views: 512
        }
      ]);
    }
    
    // Create users collection if it doesn't exist
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      
      // Add a default admin user
      await db.collection('users').insertOne({
        fullName: 'Admin User',
        email: 'admin@galleryx.com',
        username: 'admin',
        // In a real app, this would be properly hashed
        password: 'hashed_adminpassword',
        role: 'admin',
        hasPurchasedTicket: true,
        createdAt: new Date()
      });
    }
    
    // Create tickets collection if it doesn't exist
    if (!collectionNames.includes('tickets')) {
      await db.createCollection('tickets');
    }
    
    return {
      success: true,
      message: 'Database initialized successfully'
    };
  } catch (error) {
    console.error('Error initializing database:', error);
    return {
      success: false,
      message: `Database initialization failed: ${error.message}`
    };
  }
}