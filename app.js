const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const assignmentRoutes = require('./routes/assignment');
const attendanceRoutes = require('./routes/attendance');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100 
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected successfully'))
.catch(err => console.error('Connection failed:', err));

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(limiter);

// Connect Database
connectDB();

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
