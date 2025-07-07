import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import submissionRoutes from './routes/submissionRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes);

export default app;
