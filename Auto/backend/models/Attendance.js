const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema(
    {
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        date: {
            type: Date,
            required: true
        },
        checkInTime: {
            type: Date,
            required: true
        },
        checkOutTime: {
            type: Date
        },
        status: {
            type: String,
            required: true,
            enum: ['Present', 'Absent', 'Half Day'],
            default: 'Present'
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
