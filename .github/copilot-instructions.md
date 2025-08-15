# AI Agent Instructions for E-commerce MERN App

## Project Overview

This is a MERN stack e-commerce application with user and admin functionalities. Key technologies:

- Backend: Node.js/Express.js (server/)
- Frontend: React + Vite (client/)
- Database: MongoDB
- Authentication: JWT
- Payment: Midtrans integration

## Architecture Patterns

### Backend Structure

- **Models** (`server/models/`): Mongoose schemas with built-in validations and hooks

  - Example: User model includes password hashing middleware and comparison methods

  ```javascript
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  ```

- **Controllers** (`server/controllers/`): Business logic and request handling

  - Follow pattern: validation → business logic → response
  - Always use try-catch blocks for error handling

- **Routes** (`server/routes/`): Express routes with middleware chains
  - Protected routes use `auth.js` middleware
  - Admin routes require role verification

### Frontend Structure

- **Pages** (`client/src/pages/`): Main route components
- **Components** (`client/src/components/`): Reusable UI components
- Uses Vite for development with HMR
- Tailwind CSS for styling

## Development Workflow

### Environment Setup

Required in `server/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_jwt_secret
EMAIL_SECRET=your_email_secret
CLIENT_URL=http://localhost:5173
```

### Common Commands

```bash
# Backend (from server/)
npm run dev  # Start development server

# Frontend (from client/)
npm run dev  # Start Vite dev server
```

## Security Patterns

- All passwords are hashed using bcrypt
- JWT authentication with refresh tokens
- Email verification flow for new users
- Role-based access control (user/admin)

## Integration Points

- **MongoDB**: Used through Mongoose models
- **Midtrans**: Payment gateway integration (upcoming)
- **Email Service**: Used for verification emails

## Testing

- No established testing patterns yet - area for improvement

## Conventions

- Use ES Modules (import/export) syntax
- Async/await for all database operations
- Controller methods follow RESTful naming
- Error responses include `message` field
- Success responses include `data` field with payload

## Known Limitations

- Email verification token doesn't expire
- No rate limiting implemented yet
- Needs additional input validation
