# Connection Test Script

This directory contains a simple connection test for your ChurchConnect backend and frontend integration.

## Backend Connection Test

To verify that your backend is properly set up and running:

1. Make sure your backend server is running on `http://localhost:5000`
2. Test the server health check:

```bash
curl -X GET http://localhost:5000/api/auth/test
```

Or test with a browser extension that allows custom headers:

```http
GET /api/auth/test
Host: localhost:5000
Content-Type: application/json
```

## Frontend Connection Test

To verify that your frontend can reach the backend:

1. Make sure both backend and frontend servers are running
2. Open browser developer tools (F12) on your frontend at `http://localhost:8080`
3. In the Console tab, run:

```javascript
// Test basic connectivity
fetch('http://localhost:5000/api/auth/test')
  .then(response => response.json())
  .then(data => console.log('Connection successful:', data))
  .catch(error => console.error('Connection failed:', error));
```

## Environment Configuration Check

Verify your environment files are properly configured:

### Backend (.env in /backend directory):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/churchconnect
JWT_SECRET=churchconnect_secret_key
```

### Frontend (.env in main directory):
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Expected Response

When you make a successful API call to your backend, you should receive a response in the format:
```json
{
  "message": "Backend is running successfully!"
}
```

## Common Connection Issues and Solutions

1. **Network Error / ECONNREFUSED**:
   - Solution: Make sure your backend server is running on port 5000

2. **CORS Error**:
   - Solution: Check that your backend has CORS properly configured (it should allow requests from localhost:8080)

3. **404 Error**:
   - Solution: Verify the API endpoint URL is correct (should be http://localhost:5000/api/[endpoint])

4. **401 Unauthorized**:
   - Solution: For protected endpoints, make sure you're including a valid JWT token in the Authorization header

## Postman/Newman Collection Test

If you have Postman installed, you can import a collection to test all endpoints:

1. Create a new collection with requests to all your API endpoints
2. Test endpoints in the following order:
   - POST /api/auth/register - Register a test user
   - POST /api/auth/login - Login with test user
   - GET /api/auth/profile - Get profile (with token)
   - GET /api/church - Get churches (with token)
   - GET /api/events - Get events (with token)
   And so on for all endpoints

## Integration Testing

Once both servers are running:

1. Register a new user through the frontend
2. Verify the user is created in your database
3. Login with the new user
4. Access protected routes
5. Verify JWT token handling
6. Test CRUD operations for different entities (churches, events, etc.)

This completes the connection verification process for your ChurchConnect application.