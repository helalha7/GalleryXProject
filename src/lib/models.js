/**
 * Models for the GalleryX application
 * Define the data structure for MongoDB collections
 */

// Artifact model (individual art pieces/sculptures)
export const artifactModel = {
  name: String,            // Name of the artifact
  description: String,     // Detailed description
  shortDescription: String, // Brief description for cards
  imageUrl: String,        // Main image URL
  gallery: String,         // Reference to gallery/room ID
  createdYear: String,     // When the artifact was created
  artist: String,          // Artist/creator
  audioUrl: String,        // URL to audio explanation (optional)
  additionalInfo: String,  // More context or information
  isOnDisplay: Boolean,    // Whether currently on display
  dateAdded: { type: Date, default: Date.now },
  views: { type: Number, default: 0 } // Track popularity
};

// Gallery/Room model (collections of artifacts)
export const galleryModel = {
  name: String,            // Gallery/room name (e.g., "Ancient Art")
  description: String,     // Description of this gallery
  color: String,           // For the museum map display (hex or tailwind color)
  position: String,        // Position on map (e.g., "Gallery A")
  artifactsCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
};

// User model (visitors and admins)
export const userModel = {
  fullName: String,
  email: String,
  username: String,
  password: String,        // Will be hashed
  role: {
    type: String,
    enum: ['visitor', 'admin'],
    default: 'visitor'
  },
  hasPurchasedTicket: { type: Boolean, default: false },
  ticketExpiry: Date,
  createdAt: { type: Date, default: Date.now }
};

// Visitor analytics
export const visitorAnalyticsModel = {
  date: { type: Date, default: Date.now },
  visitorCount: Number,
  uniqueVisitors: Number,
  popularArtifacts: Array,  // IDs of most viewed artifacts
  averageTimeSpent: Number  // in minutes
};

// Tickets model
export const ticketModel = {
  userId: String,          // Reference to user who purchased
  type: String,            // "Virtual Tour Pass" etc.
  price: Number,
  purchaseDate: { type: Date, default: Date.now },
  expiryDate: Date,
  isActive: { type: Boolean, default: true }
};