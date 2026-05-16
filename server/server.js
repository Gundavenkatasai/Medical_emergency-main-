// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
dotenv.config();

console.log('🔧 Environment loaded');
console.log('📍 MongoDB URI exists:', !!process.env.MONGODB_URI);
console.log('🔑 JWT Secret exists:', !!process.env.JWT_SECRET);

import express from 'express';
console.log('✓ Express imported');
import cors from 'cors';
console.log('✓ CORS imported');
import connectDB from './config/db.js';
console.log('✓ connectDB imported');
import authRoutes from './routes/authRoutes.js';
console.log('✓ authRoutes imported');
import hospitalRoutes from './routes/hospitalRoutes.js';
console.log('✓ hospitalRoutes imported');
import pharmacyRoutes from './routes/pharmacyRoutes.js';
console.log('✓ pharmacyRoutes imported');
import adminRoutes from './routes/adminRoutes.js';
console.log('✓ adminRoutes imported');
import locationRoutes from './routes/locationRoutes.js';
console.log('✓ locationRoutes imported');
import assistantRoutes from './routes/assistantRoutes.js';
console.log('✓ assistantRoutes imported');

// Initialize Express app
console.log('🎬 Initializing Express app...');
const app = express();
console.log('✓ Express app created');

// Add process error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process - let it continue running
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // Don't exit the process - let it continue running
});

process.on('exit', (code) => {
  console.log(`⚠️  Process exiting with code: ${code}`);
});

process.on('beforeExit', (code) => {
  console.log(`⚠️  Process about to exit with code: ${code}`);
});

// Connect to MongoDB (non-blocking - don't await)
console.log('🗄️  Starting MongoDB connection in background...');
connectDB().catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
  console.error('📢 Server will continue running, but database features will not work.');
  // Don't exit - some routes might still work
});
console.log('✓ MongoDB connection initiated (non-blocking)');

// Middleware - CORS configuration for production
console.log('⚙️  Setting up middleware...');
try {
  app.use(cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:5173', 
        'http://localhost:3000', 
        'http://127.0.0.1:5173',
        'http://172.29.224.1:8080',
        'https://172.29.224.1:8080',
        'http://localhost:8080',
        'https://localhost:8080',
        'https://localhost:8081',
        'https://localhost:5173',
        'https://127.0.0.1:8080',
        'https://127.0.0.1:8081',
        'https://medical-emergency-tan.vercel.app',
        'https://medical-emergency-pizq6iqca.vercel.app',
        process.env.FRONTEND_URL
      ].filter(Boolean);
      
      // Allow all Vercel preview URLs
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // Still allow the request but log it
        console.log('CORS allowed for origin:', origin);
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600
  }));
  console.log('✓ CORS configured');
  app.use(express.json());
  console.log('✓ JSON parser configured');
  app.use(express.urlencoded({ extended: true }));
  console.log('✓ URL encoder configured');

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Handle OPTIONS requests explicitly for CORS preflight
  app.options('*', cors());

  // API Routes
  console.log('📍 Registering routes...');
  app.use('/api/auth', authRoutes);
  console.log('✓ Auth routes registered');
  app.use('/api/hospitals', hospitalRoutes);
  console.log('✓ Hospital routes registered');
  app.use('/api/pharmacies', pharmacyRoutes);
  console.log('✓ Pharmacy routes registered');
  app.use('/api/admin', adminRoutes);
  console.log('✓ Admin routes registered');
  app.use('/api/location', locationRoutes);
  console.log('✓ Location routes registered');
  app.use('/api/assistant', assistantRoutes);
  console.log('✓ Assistant routes registered');
} catch (error) {
  console.error('❌ ERROR setting up middleware:', error.message);
  console.error('📍 Error details:', error);
  console.error('⚠️  Attempting to continue with basic server...');
  // Don't exit - keep the server running
}

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Health Hub API is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Health Hub API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      hospitals: '/api/hospitals',
      pharmacies: '/api/pharmacies',
      admin: '/api/admin',
      location: '/api/location',
      assistant: '/api/assistant',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
console.log('📍 Starting server...');
const PORT = process.env.PORT || 5000;
console.log(`🔌 Listening on port ${PORT}`);

// Set a startup timeout to detect hangs
const startupTimeout = setTimeout(() => {
  console.error('❌ Server startup timeout! The server is taking too long to start.');
  console.error('This usually means there\'s a hung async operation during initialization.');
  process.exit(1);
}, 15000); // 15 second timeout

const server = app.listen(PORT, () => {
  clearTimeout(startupTimeout);
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`💊 Health Check: http://localhost:${PORT}/api/health\n`);
  
  // Keep the server alive - prevent exit
  setInterval(() => {
    // Noop to keep event loop active
  }, 2147483647); // Max setTimeout value
});

// Keep server alive
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

// Log when server closes
server.on('close', () => {
  console.log('⚠️ Server closed');
});

export default app;
