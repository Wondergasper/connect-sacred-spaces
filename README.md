# ChurchConnect Frontend

This is the frontend application for the ChurchConnect platform, built with React, TypeScript, Vite, and Tailwind CSS.

## Project info

**URL**: https://lovable.dev/projects/4dbaadb2-ae04-4342-b47b-51f44f0809e5

## Backend Connection

This frontend connects to a backend API. Make sure to set up the backend first before running the frontend.

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Backend server running (see backend/README.md for setup)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4dbaadb2-ae04-4342-b47b-51f44f0809e5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables (see above)

# Step 5: Make sure backend is running on http://localhost:5000

# Step 6: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router DOM
- React Hook Form
- Zod (validation)
- Axios (HTTP client)

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Connecting to Backend

### 1. Backend Setup
First, set up and start your backend:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
PORT=5000
MONGO_URI=mongodb://localhost:27017/churchconnect
JWT_SECRET=churchconnect_secret_key

# Start the backend server
npm run dev
```

### 2. Frontend Setup
After backend is running, set up the frontend:

```bash
# From the main project directory (not backend)
npm install

# Create .env file with:
VITE_API_BASE_URL=http://localhost:5000/api

# Start the frontend server
npm run dev
```

### 3. API Services
The frontend connects to the backend through API services located in `/src/services`:
- `authService` - Authentication endpoints
- `churchService` - Church management
- `eventService` - Event management
- `groupService` - Group management
- `donationService` - Donation processing
- `mediaService` - Media library
- `dashboardService` - Dashboard statistics

All API calls are handled through `src/services/api.ts` which includes:
- Base URL configuration from environment variables
- JWT token inclusion in requests
- 401 error handling for token expiration
- Request and response interceptors

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4dbaadb2-ae04-4342-b47b-51f44f0809e5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
