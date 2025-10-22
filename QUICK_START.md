# Quick Start Guide for ChurchConnect

This guide helps you quickly get both the backend and frontend applications running together.

## Prerequisites

Before starting, ensure you have:
- Node.js v14+ installed
- MongoDB running locally or accessible via connection string
- Both frontend and backend dependencies installed

## Step-by-Step Startup

### 1. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies (only needed once)
npm install

# Set up environment variables
# Create .env file with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/churchconnect
# JWT_SECRET=churchconnect_secret_key

# Start the backend server
npm run dev
```

### 2. Frontend Setup
In a new terminal window/tab (while keeping the backend running):
```bash
# Navigate to the main project directory
cd ..

# Install dependencies (only needed once)
npm install

# Set up environment variables
# Create .env file with:
# VITE_API_BASE_URL=http://localhost:5000/api

# Start the frontend server
npm run dev
```

### 3. Verification
- Backend should be running at: `http://localhost:5000`
- Frontend should be running at: `http://localhost:8080`
- API endpoints will be accessible at: `http://localhost:5000/api/*`

## Running Both Simultaneously

For development, you can use a tool like `concurrently` to run both servers at once:

```bash
# Install concurrently globally (if not already installed)
npm install -g concurrently

# Run both servers simultaneously from the main project directory
concurrently "cd backend && npm run dev" "npm run dev"
```

Or use the following script in your package.json:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:full": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "vite"
  }
}
```

## Troubleshooting Common Issues

### Port Conflicts
- Ensure no other applications are using ports 5000 (backend) and 8080 (frontend)

### Database Connection
- Verify MongoDB is running locally or your connection string is correct
- Check the MONGO_URI in your backend .env file

### Environment Variables
- Confirm both backend and frontend .env files are properly configured
- Restart servers after making changes to .env files

### CORS Issues
- The backend is configured to handle CORS for localhost:8080
- If using different ports, update the CORS configuration in server.js

### API Connection Issues
- Verify the VITE_API_BASE_URL in the frontend .env matches your backend address
- Check browser console for network errors
- Verify backend server is running and accessible