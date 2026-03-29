const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const markRoutes = require('./routes/markRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', markRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

const { MongoMemoryServer } = require('mongodb-memory-server');

const PORT = process.env.PORT || 5001;

// Start In-Memory MongoDB for guaranteed demo success
const startServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to In-Memory MongoDB Successfully!');
    
    // Seed default users
    const seedUsers = async () => {
      try {
        const bcrypt = require('bcryptjs');
        const User = require('./models/User');
        const Subject = require('./models/Subject');
        const Mark = require('./models/Mark');
        const Attendance = require('./models/Attendance');
        
        const existingUsers = await User.countDocuments();
        if (existingUsers === 0) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash('password123', salt);
          
          // Create users
          const users = await User.create([
            {
              name: 'Admin User',
              email: 'admin@example.com',
              password: hashedPassword,
              role: 'Admin'
            },
            {
              name: 'Student User',
              email: 'student@example.com',
              password: hashedPassword,
              role: 'Student'
            },
            {
              name: 'John Doe',
              email: 'john@example.com',
              password: hashedPassword,
              role: 'Student'
            },
            {
              name: 'Jane Smith',
              email: 'jane@example.com',
              password: hashedPassword,
              role: 'Student'
            },
            {
              name: 'Mike Johnson',
              email: 'mike@example.com',
              password: hashedPassword,
              role: 'Student'
            }
          ]);

          // Create subjects
          const subjects = await Subject.create([
            { name: 'Mathematics', code: 'MATH101', totalClassesHeld: 10 },
            { name: 'Physics', code: 'PHY101', totalClassesHeld: 10 },
            { name: 'Chemistry', code: 'CHEM101', totalClassesHeld: 10 },
            { name: 'English', code: 'ENG101', totalClassesHeld: 10 }
          ]);

          // Create marks for each student
          const markData = [];
          const students = users.filter(u => u.role === 'Student');
          
          for (let student of students) {
            for (let subject of subjects) {
              markData.push({
                studentId: student._id,
                subjectId: subject._id,
                mid1: Math.floor(Math.random() * 20) + 30, // 30-50
                mid2: Math.floor(Math.random() * 20) + 30,
                semester: Math.floor(Math.random() * 20) + 30
              });
            }
          }
          await Mark.insertMany(markData);

          // Create attendance records
          const attendanceData = [];
          for (let student of students) {
            for (let subject of subjects) {
              // 10 attendance records per student per subject
              for (let i = 0; i < 10; i++) {
                const date = new Date();
                date.setDate(date.getDate() - (10 - i));
                
                const statuses = ['Present', 'Absent', 'Leave'];
                const randomStatus = Math.random() > 0.3 ? 'Present' : 'Absent'; // More presents for better demo
                
                attendanceData.push({
                  studentId: student._id,
                  subjectId: subject._id,
                  date: date,
                  status: randomStatus
                });
              }
            }
          }
          await Attendance.insertMany(attendanceData);

          console.log('📌 Seed users created successfully!');
          console.log(`📌 Created ${users.length} users, ${subjects.length} subjects, ${markData.length} marks, ${attendanceData.length} attendance records!`);
        }
      } catch (seedErr) {
        console.error('Error seeding users:', seedErr);
      }
    };
    
    await seedUsers();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running perfectly on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
