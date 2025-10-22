# ChurchConnect Backend

This is the backend server for the ChurchConnect application, built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT-based)
- Church management system
- Event management
- Donation processing
- Media library
- Group/Community features
- Role-based access control
- Comprehensive error handling

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- MongoDB (either locally installed or MongoDB Atlas)
- npm (v6 or higher) or yarn

## Installation

1. Clone the repository
2. Navigate to the backend folder: `cd churchconnect-backend`
3. Install dependencies: `npm install`
4. Create a `.env` file based on the example below with your MongoDB URI and JWT secret
5. Start the server: `npm run dev`

## Environment Variables

Create a `.env` file in the root folder with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_or_local_mongodb
JWT_SECRET=churchconnect_secret_key
```

For local development with MongoDB installed locally:
```
MONGO_URI=mongodb://localhost:27017/churchconnect
```

## Starting the Server

- For development: `npm run dev` (uses nodemon for auto-restart on changes)
- For production: `npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Churches
- `GET /api/church` - Get all churches (requires auth)
- `POST /api/church` - Create a new church (requires auth)
- `GET /api/church/:id` - Get a specific church (requires auth)
- `PUT /api/church/:id` - Update a church (requires auth)
- `DELETE /api/church/:id` - Delete a church (requires auth)
- `POST /api/church/:id/members` - Add a member to a church (requires auth)
- `DELETE /api/church/:id/members` - Remove a member from a church (requires auth)

### Events
- `GET /api/events` - Get events (requires auth)
- `POST /api/events` - Create a new event (requires auth)
- `GET /api/events/:id` - Get a specific event (requires auth)
- `PUT /api/events/:id` - Update an event (requires auth)
- `DELETE /api/events/:id` - Delete an event (requires auth)
- `POST /api/events/:id/rsvp` - RSVP to an event (requires auth)

### Donations
- `GET /api/donations` - Get donations (requires auth)
- `POST /api/donations` - Create a new donation (requires auth)
- `GET /api/donations/:id` - Get a specific donation (requires auth)
- `PUT /api/donations/:id` - Update a donation (requires auth)
- `DELETE /api/donations/:id` - Delete a donation (requires auth)
- `GET /api/donations/stats` - Get donation statistics (requires auth)

### Media
- `GET /api/media` - Get media (requires auth)
- `POST /api/media` - Upload new media (requires auth)
- `GET /api/media/:id` - Get specific media (requires auth)
- `PUT /api/media/:id` - Update media (requires auth)
- `DELETE /api/media/:id` - Delete media (requires auth)
- `GET /api/media/public` - Get public media (no auth required)

### Groups
- `GET /api/groups` - Get groups (requires auth)
- `POST /api/groups` - Create a new group (requires auth)
- `GET /api/groups/:id` - Get a specific group (requires auth)
- `PUT /api/groups/:id` - Update a group (requires auth)
- `DELETE /api/groups/:id` - Delete a group (requires auth)
- `POST /api/groups/:id/join` - Join a group (requires auth)
- `POST /api/groups/:id/leave` - Leave a group (requires auth)
- `POST /api/groups/:id/admins` - Add admin to a group (requires auth)

### Departments
- `GET /api/departments` - Get departments (requires auth)
- `POST /api/departments` - Create a new department (requires auth)
- `GET /api/departments/:id` - Get a specific department (requires auth)
- `PUT /api/departments/:id` - Update a department (requires auth)
- `DELETE /api/departments/:id` - Delete a department (requires auth)

### Announcements
- `GET /api/announcements` - Get announcements (requires auth)
- `POST /api/announcements` - Create a new announcement (requires auth)
- `GET /api/announcements/:id` - Get a specific announcement (requires auth)
- `PUT /api/announcements/:id` - Update an announcement (requires auth)
- `DELETE /api/announcements/:id` - Delete an announcement (requires auth)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (requires auth)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- BCrypt for password hashing
- Dotenv for environment variables
- CORS for cross-origin requests
- Morgan for logging
- Nodemon for development

## Error Handling

The application includes comprehensive error handling for:
- Invalid routes (404)
- Invalid object IDs (404)
- Duplicate field values (400)
- Validation errors (400)
- JWT authentication errors (401)
- Server errors (500)

## Database Models

The backend includes the following main models:

- **User**: Stores user information including authentication details and roles
- **Church**: Represents a church or denomination with members and activities
- **Event**: Church events and activities with dates and locations
- **Donation**: Financial contributions with payment information
- **Media**: Sermons, music, books, and other media content
- **Group**: Community groups for fellowship and activities
- **Announcement**: Church announcements and updates
- **Department**: Church departments and administrative units

## Folder Structure

```
churchconnect-backend/
├── config/
│   └── db.js (database connection)
├── src/
│   ├── controllers/ (request handling logic)
│   ├── middleware/ (auth, error handling)
│   ├── models/ (database models)
│   ├── routes/ (API route definitions)
│   └── utils/ (utility functions)
├── .env (environment variables - not in version control)
├── server.js (main application entry point)
└── package.json
```

## Development Tips

- Use `npm run dev` during development for automatic restart on file changes
- Always implement proper error handling in controllers
- Use environment variables for sensitive information
- Follow REST API best practices for endpoint design
- Implement appropriate validation and sanitization
- Use the middleware folder for authentication and authorization

## Connecting with Frontend

This backend is designed to work with the ChurchConnect frontend application. The frontend connects to this backend through the following configuration:

### Frontend Requirements:
- The frontend should be configured to connect to this backend
- Environment variable: `VITE_API_BASE_URL=http://localhost:5000/api`
- All API calls from frontend should be prefixed with `/api`
- JWT tokens are required for most endpoints (except login/register)

### CORS Configuration:
The backend is configured to allow cross-origin requests from the frontend, enabling seamless communication between the two applications during development.

### API Services Integration:
The frontend uses dedicated service files that map to each of the backend endpoints:
- `authService` for authentication endpoints
- `churchService` for church management
- `eventService` for events
- And so on for each feature module

### Testing the Connection:
1. Start the backend server: `npm run dev`
2. Verify the backend is running at `http://localhost:5000`
3. Start the frontend server with proper API configuration
4. Test endpoints via the frontend application
5. Monitor server logs for successful API calls