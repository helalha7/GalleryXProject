import mongoose from 'mongoose';

const coordsSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
}, { _id: false });

const artifactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicates by name
  },
  description: String,
  imageUrl: String,
  artist: String,
  createdYear: String,
  additionalInfo: String,
  audioUrl: String,
  gallery: String,
  views: {
    type: Number,
    default: 0,
  },
  coords: coordsSchema,
});

export default mongoose.models.Artifact || mongoose.model('Artifact', artifactSchema);
