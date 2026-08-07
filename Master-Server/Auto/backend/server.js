require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

const path = require('path');

const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');
const autoRoutes = require('./routes/autoRoutes');
const tripRoutes = require('./routes/tripRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const feedRoutes = require('./routes/feedRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const settlementRoutes = require('./routes/settlementRoutes');
const liveFeedRoutes = require('./routes/liveFeedRoutes');
const staffRoutes = require('./routes/staffRoutes');
const adminStaffRoutes = require('./routes/adminStaffRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/autos', autoRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/settlements', settlementRoutes);
app.use('/api/live-feed', liveFeedRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/admin', adminStaffRoutes);

// Serve Frontend
const fs = require('fs');
const frontendPath = path.join(__dirname, 'dist');

if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));

    app.get(/.*/, (req, res) =>
        res.sendFile(path.join(frontendPath, 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}




// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
