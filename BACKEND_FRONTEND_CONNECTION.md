# Complete Backend-Frontend Connection Guide

This guide provides all necessary steps to connect your ChurchConnect backend and frontend applications.

## Prerequisites

Before proceeding, ensure you have:
- Node.js v14+ installed on your system
- MongoDB installed and running locally (or MongoDB Atlas connection)
- Both backend and frontend repositories ready

## Step 1: Backend Setup

### 1.1 Navigate to Backend Directory
```bash
cd backend
```

### 1.2 Install Backend Dependencies
```bash
npm install
```

### 1.3 Configure Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/churchconnect
JWT_SECRET=churchconnect_secret_key
```

For MongoDB Atlas (production):
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/churchconnect?retryWrites=true&w=majority
JWT_SECRET=your_production_secret_key
```

### 1.4 Start Backend Server
```bash
npm run dev
```

Your backend should now be running at `http://localhost:5000`

## Step 2: Frontend Setup

### 2.1 Navigate to Frontend Directory
```bash
cd ..  # Return to main project directory
```

### 2.2 Install Frontend Dependencies
```bash
npm install
```

### 2.3 Configure Frontend Environment
There should already be a `.env` file in the frontend root with:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

If it doesn't exist, create it with the above content.

### 2.4 Start Frontend Server
```bash
npm run dev
```

Your frontend should now be running at `http://localhost:8080`

## Step 3: Connection Verification

### 3.1 Test Basic Connection
1. Open your browser and navigate to `http://localhost:8080`
2. The frontend should load without errors
3. Check browser console for any API connection errors

### 3.2 Test Authentication Flow
1. Try to register a new user via the Auth page
2. Verify the request reaches the backend at `http://localhost:5000/api/auth/register`
3. Check that the user is created in your MongoDB database

### 3.3 Test API Endpoints
With both servers running, you can make requests to:
- Authentication: `http://localhost:5000/api/auth`
- Church management: `http://localhost:5000/api/church`
- Events: `http://localhost:5000/api/events`
- Groups: `http://localhost:5000/api/groups`
- Donations: `http://localhost:5000/api/donations`
- Media: `http://localhost:5000/api/media`
- Dashboard: `http://localhost:5000/api/dashboard`

## Step 4: CORS Configuration

The backend is configured to handle CORS properly. The server.js file includes:
```javascript
app.use(cors());
```

This allows requests from `http://localhost:8080` by default.

## Step 5: Error Handling

Both backend and frontend have comprehensive error handling:
- Backend returns appropriate HTTP status codes
- Frontend handles 401 (unauthorized) by redirecting to login
- Network errors are handled gracefully

## Development Workflow

### For Development:
1. Start backend: `cd backend && npm run dev`
2. In a separate terminal, start frontend: `npm run dev`
3. Both will auto-reload on file changes

### For Production:
1. Build frontend: `npm run build`
2. Serve frontend files via web server (nginx, Apache, etc.)
3. Ensure API requests are properly proxied to backend

## Troubleshooting

### Common Issues:

1. **CORS Error**: Ensure backend server is running and CORS is configured
2. **Database Connection**: Verify MongoDB is running and connection string is correct
3. **Port Conflicts**: Ensure ports 5000 (backend) and 8080 (frontend) are available
4. **Environment Variables**: Verify all .env files have correct values

### Testing API Connection:
```bash
# Test backend directly
curl http://localhost:5000/api/auth/test

# Test with frontend headers
curl -H "Content-Type: application/json" http://localhost:5000/api/auth/test
```

### Database Verification:
You can use MongoDB Compass or the MongoDB CLI to verify data is being stored correctly.

## Security Considerations

- JWT tokens are stored in browser localStorage (consider HttpOnly cookies for production)
- Passwords are hashed using bcrypt
- API endpoints are protected by authentication middleware
- Input validation is implemented via Mongoose schemas

## Deployment Notes

### For Production Deployment:
- Update JWT_SECRET to a strong, random value
- Use environment variables for sensitive data
- Set up proper logging
- Configure SSL/HTTPS
- Implement proper session management
- Set up database backups

## API Documentation Reference

The backend API endpoints match the frontend service calls:
- All endpoints follow RESTful conventions
- Authentication is required for most endpoints using Bearer tokens
- Response format: { success: boolean, data: object, message: string (optional) }

## Conclusion

Following this guide will establish a fully functional connection between your ChurchConnect backend and frontend. The integration maintains security best practices while providing a seamless user experience.