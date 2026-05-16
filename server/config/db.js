import mongoose from 'mongoose';

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✓ Using existing MongoDB connection');
    return cachedConnection;
  }

  try {
    console.log('🔌 Attempting MongoDB connection...');
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable not set');
    }

    let uri = process.env.MONGODB_URI;
    
    // Better logic to ensure we use healthhub database
    // Only if no database is specified in the URI path
    const urlObj = new URL(uri.startsWith('mongodb') ? uri.replace('mongodb+srv', 'http').replace('mongodb', 'http') : uri);
    if (urlObj.pathname === '/' || urlObj.pathname === '') {
      // No database specified, append healthhub
      if (uri.includes('?')) {
        const parts = uri.split('?');
        uri = parts[0].endsWith('/') ? parts[0] + 'healthhub?' + parts[1] : parts[0] + '/healthhub?' + parts[1];
      } else {
        uri = uri.endsWith('/') ? uri + 'healthhub' : uri + '/healthhub';
      }
    }

    console.log('📍 Connecting to database...');

    const opts = {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
    };

    cachedConnection = await mongoose.connect(uri, opts);
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    console.log(`📊 Database: ${mongoose.connection.name}`);

    return cachedConnection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    cachedConnection = null;
    throw error;
  }
};

export const isConnected = () => mongoose.connection.readyState === 1;
export default connectDB;
