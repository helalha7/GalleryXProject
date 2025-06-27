import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        image: String,        // cover image
        mapImage: String,     // interactive map image with artifact markers
        position: {
            type: String,
            required: true,
            unique: true, 
            enum: ['gallery 1', 'gallery 2', 'gallery 3', 'gallery 4', 'gallery 5'], //restrict to valid values
        },
    },
    { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
