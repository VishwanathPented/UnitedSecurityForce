import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String, // URL
    },
    category: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
