import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    status: { type: String, enum: ['new', 'read', 'contacted'], default: 'new' },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
