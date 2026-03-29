# Smart Attendance System - Login Guide

## 🚀 Getting Started

The application consists of a **React frontend** and a **Node.js/Express backend**. Both are configured and ready to use.

### Starting the Servers

#### Backend (Port 5000):
```bash
cd backend
npm start
```

#### Frontend (Port 5179):
```bash
cd frontend
npm run dev
```

---

## 👤 Test Credentials

The system comes with two pre-configured test accounts:

### Admin Account:
- **Email:** `admin@example.com`
- **Password:** `password123`
- **Role:** Admin Dashboard Access

### Student Account:
- **Email:** `student@example.com`
- **Password:** `password123`
- **Role:** Student Dashboard Access

---

## ✅ Login Troubleshooting

If you encounter "Login failed" error:

1. **Check Backend Status:**
   - Ensure backend is running on port 5000
   - You should see: `✅ Connected to In-Memory MongoDB` and `📌 Seed users created successfully!`

2. **Verify Credentials:**
   - Use exactly: `admin@example.com` / `password123`
   - Or: `student@example.com` / `password123`
   - No spaces in email or password

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Check Console tab for detailed error messages
   - Look for network requests to `http://localhost:5000/api/auth/login`

4. **Clear Browser Data:**
   - Clear localStorage and cookies if you were previously logged in
   - Try the login again

5. **CORS Configuration:**
   - Backend allows requests from all origins (`cors` enabled)
   - No additional setup needed

---

## 🔄 Workflow

1. **Login Page** → Enter credentials → Submit
2. **Successful Login:**
   - Admin: Redirected to `/admin`
   - Student: Redirected to `/student`
   - Token saved in localStorage
3. **Authentication:**
   - Token is automatically included in all API requests
   - Backend validates token on protected routes

---

## 📝 Database

- **Database Type:** MongoDB In-Memory Server (mongodb-memory-server)
- **Behavior:** Fresh database starts each time backend restarts
- **Persistence:** Data exists only during current session
- **Users:** Auto-created on backend startup with seed data

---

## 🛠️ API Details

### Login Endpoint
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "Admin"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Invalid Credentials"
}
```

---

## 💡 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot connect to backend" | Ensure backend is running on port 5000 |
| "Invalid Credentials" | Double-check email and password match test accounts |
| "Port already in use" | Kill existing process or use a different port |
| "500 Internal Server Error" | Check backend console for errors |
| Login succeeds but page doesn't load | Check browser console for navigation errors |

---

**Last Updated:** March 2026
