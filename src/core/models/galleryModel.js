import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        image: String,         // cover image
        mapImage: String,      // interactive map image with artifact markers
        position: String,
    },
    { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
