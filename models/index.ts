import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    unique: true,
    require: true,
  },
  originalUrl: {
    type: String,
    unique: true,
    require: true,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

const URL = mongoose.model('URL', UrlSchema);

export default URL;
