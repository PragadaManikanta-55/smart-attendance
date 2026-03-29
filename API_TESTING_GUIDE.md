# Smart Attendance - API Testing Guide

## 🎯 Quick API Test Examples

All examples use `admin@example.com / password123` for authentication.

---

## 1️⃣ Authentication Endpoints

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "69c367df7f47e2603eb3f33c",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "Admin"
  }
}
```

---

## 2️⃣ Student Endpoints

### Get All Students
```bash
curl http://localhost:5000/api/users/students
```

**Response:**
```json
[
  {
    "_id": "69c367df7f47e2603eb3f33d",
    "name": "Student User",
    "email": "student@example.com",
    "role": "Student"
  },
  {
    "_id": "69c367df7f47e2603eb3f33e",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student"
  }
]
```

### Get Student Profile with Marks & Attendance
```bash
curl http://localhost:5000/api/users/students/69c367df7f47e2603eb3f33e
```

**Response:**
```json
{
  "student": {
    "_id": "69c367df7f47e2603eb3f33e",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student"
  },
  "marks": [
    {
      "_id": "69c367e07f47e2603eb3f34a",
      "studentId": {...},
      "subjectId": {
        "_id": "69c367df7f47e2603eb3f346",
        "name": "Mathematics",
        "code": "MATH101"
      },
      "score": 85
    }
  ],
  "attendanceStats": [
    {
      "subjectId": "69c367df7f47e2603eb3f346",
      "subjectName": "Mathematics",
      "subjectCode": "MATH101",
      "present": 16,
      "absent": 3,
      "leave": 1,
      "total": 20,
      "percentage": 80
    }
  ]
}
```

### Add Student (Register)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Student",
    "email": "newstudent@example.com",
    "password": "password123",
    "role": "Student"
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/users/students/69c367df7f47e2603eb3f33e \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 3️⃣ Subject Endpoints

### Get All Subjects
```bash
curl http://localhost:5000/api/subjects
```

**Response:**
```json
[
  {
    "_id": "69c367df7f47e2603eb3f346",
    "name": "Mathematics",
    "code": "MATH101"
  },
  {
    "_id": "69c367df7f47e2603eb3f347",
    "name": "Physics",
    "code": "PHY101"
  },
  {
    "_id": "69c367df7f47e2603eb3f348",
    "name": "Chemistry",
    "code": "CHEM101"
  },
  {
    "_id": "69c367df7f47e2603eb3f349",
    "name": "English",
    "code": "ENG101"
  }
]
```

### Add Subject
```bash
curl -X POST http://localhost:5000/api/subjects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "History",
    "code": "HIST101"
  }'
```

### Get Subjects with Statistics
```bash
curl http://localhost:5000/api/subjects/with-stats
```

**Response:**
```json
[
  {
    "_id": "69c367df7f47e2603eb3f346",
    "name": "Mathematics",
    "code": "MATH101",
    "totalClasses": 20,
    "totalAttendanceRecords": 80,
    "createdAt": "2026-03-25T04:43:11.808Z"
  }
]
```

---

## 4️⃣ Marks Endpoints

### Get All Marks
```bash
curl http://localhost:5000/api/marks
```

**Response:**
```json
[
  {
    "_id": "69c367e07f47e2603eb3f34a",
    "studentId": {
      "_id": "69c367df7f47e2603eb3f33d",
      "name": "Student User",
      "email": "student@example.com"
    },
    "subjectId": {
      "_id": "69c367df7f47e2603eb3f346",
      "name": "Mathematics",
      "code": "MATH101"
    },
    "score": 75
  }
]
```

### Get Marks for a Subject
```bash
curl http://localhost:5000/api/marks/subject/69c367df7f47e2603eb3f346
```

### Add/Update Marks (Bulk)
```bash
curl -X POST http://localhost:5000/api/marks/add \
  -H "Content-Type: application/json" \
  -d '{
    "subjectId": "69c367df7f47e2603eb3f346",
    "marksData": [
      {"studentId": "69c367df7f47e2603eb3f33d", "score": 85},
      {"studentId": "69c367df7f47e2603eb3f33e", "score": 92},
      {"studentId": "69c367df7f47e2603eb3f33f", "score": 78}
    ]
  }'
```

### Get Marks Statistics for Subject
```bash
curl http://localhost:5000/api/marks/subject/69c367df7f47e2603eb3f346/stats
```

**Response:**
```json
{
  "subjectId": "69c367df7f47e2603eb3f346",
  "totalMarks": 4,
  "marks": [...],
  "statistics": {
    "average": "82.5",
    "highest": 92,
    "lowest": 75
  }
}
```

### Get Student's Marks
```bash
curl http://localhost:5000/api/marks/student/69c367df7f47e2603eb3f33e
```

### Update a Mark
```bash
curl -X PUT http://localhost:5000/api/marks/69c367e07f47e2603eb3f34a \
  -H "Content-Type: application/json" \
  -d '{"score": 88}'
```

### Delete a Mark
```bash
curl -X DELETE http://localhost:5000/api/marks/69c367e07f47e2603eb3f34a
```

---

## 5️⃣ Attendance Endpoints

### Generate QR Code
```bash
curl -X POST http://localhost:5000/api/attendance/qr/generate \
  -H "Content-Type: application/json" \
  -d '{
    "subjectId": "69c367df7f47e2603eb3f346",
    "date": "2026-03-25"
  }'
```

**Response:**
```json
{
  "secretCode": "a1b2c3d4e5f6",
  "qrPayload": "{\"subjectId\":\"69c367df7f47e2603eb3f346\",\"date\":\"2026-03-25\",\"secretCode\":\"a1b2c3d4e5f6\"}",
  "expiresAt": "2026-03-25T05:43:11.000Z"
}
```

### Mark Attendance (Student scans QR)
```bash
curl -X POST http://localhost:5000/api/attendance/qr/scan \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "69c367df7f47e2603eb3f33e",
    "qrPayload": "{\"subjectId\":\"69c367df7f47e2603eb3f346\",\"date\":\"2026-03-25\",\"secretCode\":\"a1b2c3d4e5f6\"}"
  }'
```

### Mark Attendance Manually
```bash
curl -X POST http://localhost:5000/api/attendance/mark \
  -H "Content-Type: application/json" \
  -d '{
    "subjectId": "69c367df7f47e2603eb3f346",
    "date": "2026-03-25",
    "attendanceData": [
      {"studentId": "69c367df7f47e2603eb3f33d", "status": "Present"},
      {"studentId": "69c367df7f47e2603eb3f33e", "status": "Absent"},
      {"studentId": "69c367df7f47e2603eb3f33f", "status": "Leave"}
    ]
  }'
```

### Get Student Attendance
```bash
curl http://localhost:5000/api/attendance/student/69c367df7f47e2603eb3f33e
```

### Get Attendance Stats by Subject
```bash
curl http://localhost:5000/api/attendance/subject/69c367df7f47e2603eb3f346/stats
```

**Response:**
```json
{
  "subjectId": "69c367df7f47e2603eb3f346",
  "totalRecords": 80,
  "studentStats": [
    {
      "studentId": "69c367df7f47e2603eb3f33d",
      "studentName": "Student User",
      "studentEmail": "student@example.com",
      "Present": 16,
      "Absent": 3,
      "Leave": 1,
      "total": 20,
      "percentage": 80
    }
  ]
}
```

### Get Student Attendance for Specific Subject
```bash
curl http://localhost:5000/api/attendance/student/69c367df7f47e2603eb3f33e/subject/69c367df7f47e2603eb3f346
```

**Response:**
```json
{
  "records": [...],
  "stats": {
    "present": 16,
    "absent": 3,
    "leave": 1,
    "total": 20,
    "percentage": 80
  }
}
```

### Get All Attendance Records
```bash
curl http://localhost:5000/api/attendance/analytics
```

### Get Attendance Summary for All Subjects
```bash
curl http://localhost:5000/api/attendance/summary/all-subjects
```

**Response:**
```json
[
  {
    "subjectId": "69c367df7f47e2603eb3f346",
    "subjectName": "Mathematics",
    "subjectCode": "MATH101",
    "totalClasses": 20,
    "presentCount": 64,
    "attendancePercentage": 80
  }
]
```

---

## 📝 PowerShell Testing Script

Save this as `test-api.ps1`:

```powershell
# Configuration
$BASE_URL = "http://localhost:5000/api"
$EMAIL = "admin@example.com"
$PASSWORD = "password123"

# Function to make authenticated requests
function Invoke-API {
    param([string]$Method, [string]$Endpoint, [object]$Body)
    
    $uri = "$BASE_URL$Endpoint"
    $headers = @{"Content-Type" = "application/json"}
    
    if ($token) {
        $headers["Authorization"] = "Bearer $token"
    }
    
    if ($Body) {
        $Body = $Body | ConvertTo-Json
    }
    
    $params = @{
        Uri = $uri
        Method = $Method
        Headers = $headers
        UseBasicParsing = $true
    }
    
    if ($Body) { $params["Body"] = $Body }
    
    return Invoke-WebRequest @params | ConvertFrom-Json
}

# Login
Write-Host "🔐 Logging in..." -ForegroundColor Cyan
$login = Invoke-API -Method "POST" -Endpoint "/auth/login" -Body @{
    email = $EMAIL
    password = $PASSWORD
}
$token = $login.token
Write-Host "✓ Login successful" -ForegroundColor Green

# Get Students
Write-Host "`n👥 Fetching students..." -ForegroundColor Cyan
$students = Invoke-API -Method "GET" -Endpoint "/users/students"
Write-Host "Found: $($students.Count) students" -ForegroundColor Green

# Get Subjects
Write-Host "`n📚 Fetching subjects..." -ForegroundColor Cyan
$subjects = Invoke-API -Method "GET" -Endpoint "/subjects"
Write-Host "Found: $($subjects.Count) subjects" -ForegroundColor Green

# Get All Marks
Write-Host "`n📝 Fetching marks..." -ForegroundColor Cyan
$marks = Invoke-API -Method "GET" -Endpoint "/marks"
Write-Host "Found: $($marks.Count) mark entries" -ForegroundColor Green

# Get Attendance Stats Summary
Write-Host "`n✓ Fetching attendance summary..." -ForegroundColor Cyan
$attendance = Invoke-API -Method "GET" -Endpoint "/attendance/summary/all-subjects"
Write-Host "Attendance data available for: $($attendance.Count) subjects" -ForegroundColor Green

Write-Host "`n📊 API Test Complete!" -ForegroundColor Yellow
```

**Run the script:**
```powershell
.\test-api.ps1
```

---

## 🔗 Quick Reference Table

| Feature | Endpoint | Method | Auth Required |
|---------|----------|--------|---------------|
| Get Students | `/users/students` | GET | No |
| Get Student Profile | `/users/students/:id` | GET | No |
| Add Student | `/auth/register` | POST | No |
| Delete Student | `/users/students/:id` | DELETE | Yes |
| Get Subjects | `/subjects` | GET | No |
| Add Subject | `/subjects` | POST | No |
| Get Marks | `/marks` | GET | No |
| Add Marks | `/marks/add` | POST | No |
| Get Attendance | `/attendance/student/:id` | GET | No |
| Mark Attendance | `/attendance/mark` | POST | No |
| Generate QR | `/attendance/qr/generate` | POST | No |
| Scan QR | `/attendance/qr/scan` | POST | No |

---

## ⚠️ Important Notes

1. **Authentication:** Include `Authorization: Bearer TOKEN` header for protected routes
2. **Dates:** Use format `YYYY-MM-DD` (e.g., `2026-03-25`)
3. **Scores:** Must be between 0-100
4. **Status:** Valid attendance statuses are `Present`, `Absent`, `Leave`
5. **In-Memory DB:** Data persists only during current backend session

---

## 🧪 Integration Testing Scenarios

### Scenario 1: Complete Enrollment Flow
1. Register a new student
2. Assign marks in a subject
3. Mark attendance for that student
4. Retrieve student's full profile

### Scenario 2: Attendance Tracking
1. Generate QR for today
2. Student scans QR
3. Get attendance statistics
4. Compare before/after

### Scenario 3: Report Generation
1. Get all student marks
2. Get all attendance records
3. Calculate percentages
4. Export to Excel/PDF

---

**Happy Testing! 🚀**
