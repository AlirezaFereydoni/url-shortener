import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({});

const URL = mongoose.model('URL', UrlSchema);
