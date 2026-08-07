const express = require('express');
const router = express.Router();
const {
    getStaff, addStaff, updateStaff, deleteStaff,
    getStaffStats, getStaffAttendance, addBackdateAttendance, deleteAttendance,
    getAllLeaves, updateLeaveStatus,
    getSalaryPayments, addSalaryPayment, deleteSalaryPayment,
    getAdvances, addAdvance, updateAdvance, deleteAdvance
} = require('../controllers/adminStaffController');
const {
    getAllExecutives, createExecutive, updateExecutive, deleteExecutive
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.route('/staff')
    .get(getStaff)
    .post(addStaff);

router.route('/staff/:id')
    .put(updateStaff)
    .delete(deleteStaff);

router.get('/staff-stats', getStaffStats);

router.route('/staff-attendance')
    .get(getStaffAttendance)
    .post(addBackdateAttendance);
    
router.delete('/staff-attendance/:id', deleteAttendance);

router.get('/leaves/all', getAllLeaves);
router.patch('/leaves/:id', updateLeaveStatus);

router.route('/salary-payment')
    .post(addSalaryPayment);
router.get('/salary-payments', getSalaryPayments);
router.delete('/salary-payment/:id', deleteSalaryPayment);

router.route('/advances')
    .get(getAdvances)
    .post(addAdvance);

router.route('/advances/:id')
    .put(updateAdvance)
    .delete(deleteAdvance);

router.route('/executives')
    .get(getAllExecutives)
    .post(createExecutive);

router.route('/executives/:id')
    .put(updateExecutive)
    .delete(deleteExecutive);

module.exports = router;
