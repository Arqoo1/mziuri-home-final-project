import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema({
  en: String,
  ka: String,
});

const clientReviewSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  review: {
    type: translationSchema,
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
