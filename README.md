# RBAC Authentication System

## Project Description
A comprehensive Role-Based Access Control (RBAC) authentication system built with Node.js and Express.js. This system provides secure user authentication and authorization mechanisms with different access levels based on user roles.

## Key Features
- User Authentication (Login/Register)
- Role-Based Access Control
- Secure Password Handling
- JWT Token Authentication
- Protected API Routes
- Multiple User Roles (Admin, User, etc.)
- Middleware for Role Verification

## Technical Stack
- Backend: Node.js with Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT (JSON Web Tokens)
- Password Security: Bcrypt for hashing
- Environment Variables: dotenv

## API Endpoints
- `/auth/register` - User registration
- `/auth/login` - User login
- `/user` - User management routes
- `/resource` - Protected resource routes

## Security Features
- Password Hashing
- JWT Token Authentication
- Role-Based Authorization
- Protected Routes
- Environment Variable Security

## Installation and Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Start the server: `npm start`

## Environment Variables Required
- `PORT` - Server port number
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `NODE_ENV` - Development/Production environment

## Project Structure
```
src/
├── middleware/
│   └── auth.middleware.js
├── models/
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── resource.routes.js
└── server.js
```

## Testing
The system includes comprehensive testing for:
- Authentication flows
- Role-based access
- API endpoints
- Security measures

## Future Enhancements
- Enhanced logging system
- Rate limiting
- OAuth integration
- Advanced role hierarchies