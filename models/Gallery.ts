import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    title: String,
    imageUrl: { type: String, required: true },
    category: String,
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
