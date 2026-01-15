# harshal09 Backend

This is the backend for the harshal09 event web app POC.

## Structure

- **src/config/**: Database and Firebase config
- **src/models/**: Mongoose models
- **src/middleware/**: Auth and admin middleware
- **src/routes/**: Express route handlers
- **src/app.js**: Express app setup
- **src/server.js**: Server entry point

## Setup Steps

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` with your MongoDB Atlas and Firebase credentials.
3. Start the server:
   ```bash
   npm start
   ```

## APIs
- `POST /api/register` — Register user
- `POST /api/login-log` — Log user login
- `GET /api/admin/registrations` — List registrations
- `PATCH /api/admin/user-status` — Block/unblock user
- `GET /api/admin/logins` — List login logs

## Notes
- Uses MongoDB Atlas (free tier)
- Auth via Firebase Admin SDK (free tier)
- For POC: No real email sending, just log portal link in console
- See main project README for full context
