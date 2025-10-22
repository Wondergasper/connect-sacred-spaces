# Frontend-Backend Connection Guide

This guide explains how to properly connect your frontend to your backend server.

## Prerequisites

Before connecting your frontend to the backend, ensure:

1. **Backend is running**: Make sure your backend server is up and running on port 5000 (or configured port)
2. **MongoDB is running**: The backend requires a MongoDB connection
3. **Node.js installed**: Both frontend and backend require Node.js

## Environment Configuration

The frontend expects the following environment variable:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Setup Steps:

1. Create a `.env` file in the frontend root directory (already done):
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

2. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. In a separate terminal, start your frontend:
   ```bash
   cd ..
   npm run dev
   ```

## Verification Steps

To verify the connection is working:

1. Start both servers (backend and frontend)
2. Navigate to your frontend (typically http://localhost:8080)
3. Check the browser's developer console for any API connection errors
4. Try authentication endpoints like `/auth/register` or `/auth/login`

## Common Connection Issues

### 1. CORS Issues
- Ensure your backend has CORS configured to accept requests from your frontend domain
- Default setup should allow requests from localhost:8080

### 2. Network Issues
- Verify the backend server is running on the correct port (default: 5000)
- Verify the frontend is using the correct API base URL

### 3. Environment Variable Issues
- Ensure the VITE_API_BASE_URL is correctly set in your `.env` file
- Make sure the `.env` file is in the root of your frontend project

## API Service Configuration

The frontend uses an axios-based API service with:
- Base URL configured via environment variable
- Automatic JWT token inclusion in requests
- 401 error handling for token expiration
- Request and response interceptors

See `src/services/api.ts` for implementation details.

## Testing the Connection

You can test the API connection by making a simple request in your browser console:

```javascript
// After logging in and getting a token
fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## Production Deployment

For production deployments:
- Update VITE_API_BASE_URL to point to your production backend
- Ensure proper CORS settings for your production domain
- Implement proper error handling for production environment