const fs = require('fs');

// 1. Update adminController.js
const controllerPath = 'yatree-backend/src/controllers/adminController.js';
let controllerContent = fs.readFileSync(controllerPath, 'utf8');

const newController = 

// @desc    Get all unique garage names across all maintenance and parking records
// @route   GET /api/admin/maintenance/garages/:companyId
// @access  Private/Admin
const getUniqueGarages = asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    const finalCompanyId = req.tenantFilter?.company || req.user?.company?._id || req.user?.company || companyId;
    
    const maintenanceGarages = await Maintenance.distinct('garageName', { company: finalCompanyId });
    const parkingGarages = await Parking.distinct('vendorName', { company: finalCompanyId });
    const attendanceGarages = await Parking.distinct('remark', { company: finalCompanyId, serviceType: 'car_service' }); // Some use remark

    const unique = [...new Set([...maintenanceGarages, ...parkingGarages, ...attendanceGarages])].filter(Boolean).sort();
    
    res.json(unique);
});

module.exports = {;

controllerContent = controllerContent.replace('module.exports = {', newController + '\n    getUniqueGarages,');
fs.writeFileSync(controllerPath, controllerContent);

// 2. Update adminRoutes.js
const routePath = 'yatree-backend/src/routes/adminRoutes.js';
let routeContent = fs.readFileSync(routePath, 'utf8');

routeContent = routeContent.replace('updateMaintenanceRecord,', 'updateMaintenanceRecord,\n    getUniqueGarages,');
routeContent = routeContent.replace('router.get(' + "'" + '/maintenance/:companyId' + "'" + ', adminOrExecutive, checkCompany, getMaintenanceRecords);', 
'router.get(' + "'" + '/maintenance/:companyId' + "'" + ', adminOrExecutive, checkCompany, getMaintenanceRecords);\nrouter.get(' + "'" + '/maintenance/garages/:companyId' + "'" + ', adminOrExecutive, checkCompany, getUniqueGarages);');

fs.writeFileSync(routePath, routeContent);

console.log('Backend updated successfully.');
