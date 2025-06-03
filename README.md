
# TreeAdopt 🌳

![TreeAdopt Banner](https://example.com/path-to-your-banner-image.jpg)

TreeAdopt is a web application designed to promote environmental sustainability by enabling users to adopt trees, track their environmental impact, and receive digital certificates for their contributions.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features ✨

- **User Authentication**: Secure registration and login system
- **Tree Adoption**: Browse and adopt trees with detailed environmental metrics
- **Digital Certificates**: Generate and download personalized adoption certificates
- **Impact Dashboard**: Track your environmental contributions:
  - CO₂ absorption
  - Oxygen production
- **Admin Panel**: Manage trees, users, and certificates (admin-only)
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack 💻

### Frontend
- React (TypeScript)
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (API requests)
- Sonner (toast notifications)
- Lucide React (icons)

### Backend
- Express.js
- MongoDB (database)
- Mongoose (ODM)
- Multer (file uploads)
- CORS (cross-origin support)

## Prerequisites 📋

- Node.js (v18 or later)
- MongoDB (v6 or later)
- Git
- Code editor (VS Code recommended)

## Installation 🛠️

### 1. Clone the repository
```bash
git clone https://github.com/your-username/treeadopt.git
cd treeadopt
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/treeadopt
JWT_SECRET=YOUR_API_KEY
```

Create uploads directory:
```bash
mkdir Uploads
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Configure Vite proxy in `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': 'http://localhost:5000',
    '/uploads': 'http://localhost:5000'
  }
}
```

### 4. Database Setup
Start MongoDB service:
```bash
mongod
```

(Optional) Seed test data:
```javascript
use treeadopt;
db.users.insertOne({...});
db.trees.insertOne({...});
db.certificates.insertOne({...});
```

## Running the Application 🚀

### Start Backend
```bash
cd backend
node server.js
```

### Start Frontend
```bash
cd ../frontend
npm run dev
```

Access the application at: `http://localhost:8081`

## API Endpoints 🌐

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/auth/register` | POST | User registration |
| `/api/v1/auth/login` | POST | User login |
| `/api/v1/trees` | GET | Get all trees |
| `/api/v1/trees` | POST | Create new tree (admin) |
| `/api/certificates` | POST | Generate certificate |
| `/api/certificates/user/:userId` | GET | Get user certificates |

## Testing 🧪

1. **User Authentication**:
   - Test registration and login flows
   - Verify JWT token storage

2. **Tree Adoption**:
   - Adopt a tree and verify certificate generation
   - Check dashboard updates

3. **Admin Features**:
   - Test tree management functions
   - Verify admin-only routes

## Troubleshooting 🐛

**Common Issues**:

1. **MongoDB Connection Failed**
   - Ensure MongoDB service is running
   - Verify connection string in `.env`

2. **CORS Errors**
   - Check backend CORS configuration
   ```javascript
   app.use(cors({ origin: 'http://localhost:8081' }))
   ```

3. **File Upload Issues**
   - Verify `Uploads` directory exists
   - Check Multer configuration

## Contributing 🤝
| Nama | NPM |
|----------|--------|
| Berliani Utami | 22088107010082 | 
| Riska Haqika Situmorang | 2208107010086 |


We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
