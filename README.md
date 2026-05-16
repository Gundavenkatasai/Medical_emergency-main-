# 🏥 Health Hub Live - Medical Emergency Platform

A comprehensive healthcare platform that provides emergency medical services, doctor consultations, pharmacy services, and AI-powered health assistance. Built with React, Vite, and Node.js.

## ✨ Features

### 🚨 Emergency Services
- **Emergency Hub**: Quick access to emergency medical services
- **Emergency Routing**: Real-time emergency route navigation with hospital locations
- **Community Responders**: Connect with nearby first responders
- **Incidents Feed**: Real-time emergency incident updates
- **Emergency QR**: Quick access to medical information via QR codes

### 👨‍⚕️ Healthcare Services
- **Doctor Consultations**: Browse and book appointments with specialists
- **Video Consultations**: Virtual consultations with doctors via video calls
- **Appointment Management**: Schedule and manage medical appointments
- **Health Assistant**: AI-powered health guidance and symptom checking
- **Condition Checker**: Automated symptom analysis and recommendations

### 💊 Pharmacy Services
- **Pharmacy Locator**: Find nearby pharmacies with real-time locations
- **Medicine Catalog**: Browse and search medicine inventory
- **Medicine Upload**: Prescription upload for easy ordering
- **Shopping Cart**: Manage medicine orders
- **Order Tracking**: Real-time order status and delivery tracking
- **Medicine Reminders**: Automated medication reminders

### 🗺️ Location Services
- **Interactive Maps**: Leaflet-based map integration for hospitals and pharmacies
- **Real-time Navigation**: Turn-by-turn navigation to medical facilities
- **Google Places Integration**: Enhanced location data and ratings
- **Overpass API**: OpenStreetMap data for comprehensive location coverage

### 🔐 User Management
- **Authentication**: Secure login and signup with JWT tokens
- **Protected Routes**: Role-based access control
- **Admin Dashboard**: Administrative panel for managing platform resources
- **User Profiles**: Manage personal and medical information

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Routing**: React Router DOM 6.30.1
- **UI Components**: Radix UI with shadcn/ui
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Zustand 5.0.9
- **Data Fetching**: TanStack React Query 5.83.0
- **Maps**: Leaflet 1.9.4 & React Leaflet 4.2.1
- **Forms**: React Hook Form 7.61.1 with Zod validation
- **Charts**: Recharts 2.15.4
- **Icons**: Lucide React 0.462.0

### Backend
- **Runtime**: Node.js with Express 4.18.2
- **Database**: MongoDB with Mongoose 8.0.0
- **Authentication**: JWT (jsonwebtoken 9.0.2) with bcryptjs 2.4.3
- **Validation**: Express Validator 7.0.1
- **External APIs**: 
  - Google Places API
  - Overpass API (OpenStreetMap)
  - AI Assistant integration

## 📁 Project Structure

```
health-hub-live/
├── src/
│   ├── components/
│   │   ├── cards/          # Reusable card components
│   │   ├── common/         # Common utilities (Protected routes, notifications)
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   ├── maps/           # Map components (Leaflet, Location)
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and configurations
│   ├── pages/              # Route pages/views
│   └── App.jsx             # Main application component
├── server/
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth and validation middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # External service integrations
│   └── server.js           # Express server entry point
├── public/                 # Static assets
└── api/                    # Serverless API handlers (Vercel)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (local or Atlas)
- Google Places API key (for location services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-hub-live
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create `.env` file in the `server/` directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   
   # API Keys
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   
   # Server
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   # Or for development with auto-reload
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get hospital by ID
- `POST /api/hospitals` - Add new hospital (admin)

### Pharmacies
- `GET /api/pharmacies` - Get all pharmacies
- `GET /api/pharmacies/:id` - Get pharmacy by ID
- `POST /api/pharmacies` - Add new pharmacy (admin)

### Location Services
- `GET /api/locations/nearby` - Find nearby medical facilities
- `GET /api/locations/search` - Search for locations

### AI Assistant
- `POST /api/assistant/chat` - Chat with AI health assistant
- `POST /api/assistant/symptoms` - Analyze symptoms

## 🌐 Deployment

The application is configured for deployment on Vercel:
- Frontend and serverless functions deploy automatically
- Backend can be deployed separately or use Vercel serverless functions
- See `vercel.json` for deployment configuration

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with authentication middleware
- Input validation with express-validator
- CORS configuration for secure cross-origin requests

## 🎨 UI Components

Built with **shadcn/ui** including:
- Accordion, Alert Dialog, Avatar
- Buttons, Cards, Checkboxes
- Dialog, Dropdown Menu, Form controls
- Navigation Menu, Popover, Progress
- Select, Slider, Switch, Tabs
- Toast notifications, Tooltips
- And many more...

## 🗺️ Map Integration

- **Leaflet**: Open-source interactive maps
- **React Leaflet**: React components for Leaflet
- **Google Maps API**: Enhanced location data and routing
- **Custom markers**: For hospitals, pharmacies, and emergency locations

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive utilities
- Adaptive layouts for all screen sizes
- Touch-friendly interfaces

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For support, please open an issue in the repository or contact the development team.

## 🙏 Acknowledgments

- Radix UI for accessible component primitives
- shadcn/ui for beautiful UI components
- Leaflet for map functionality
- The open-source community

---

**Built with ❤️ for better healthcare access**