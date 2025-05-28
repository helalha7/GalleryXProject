import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['visitor', 'admin'], // ✅ only these allowed
    default: 'visitor',
  },
  hasPurchasedTicket: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.models.User || mongoose.model('User', UserSchema);
