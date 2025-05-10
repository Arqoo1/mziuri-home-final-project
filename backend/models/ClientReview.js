import mongoose from 'mongoose';

const clientReviewSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Client-Review', clientReviewSchema);
