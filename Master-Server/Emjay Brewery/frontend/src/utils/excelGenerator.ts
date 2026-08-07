import * as XLSX from 'xlsx';

export const exportAttendanceToExcel = (mergedData: any[], selectedDate: string) => {
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
  
  // Map data to table rows
  const rows = mergedData.map(item => {
    const staff = item.staff || {};
    const att = item.attendance || {};
    
    let inTime = 'N/A';
    let outTime = 'N/A';
    if (att.punchIn?.time) {
      inTime = new Date(att.punchIn.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (att.punchOut?.time) {
      outTime = new Date(att.punchOut.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return {
      'Date': formattedDate,
      'Staff Name': staff.name || 'N/A',
      'Designation': staff.designation || 'N/A',
      'Staff Type': staff.staffType || 'Regular',
      'Status': (att.status || 'Not Punched In').toUpperCase(),
      'Punch In Time': inTime,
      'Punch Out Time': outTime,
      'Location Tracked': att.punchIn?.location?.lat ? 'Yes' : 'No'
    };
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  // Auto-fit columns
  const maxProps = [{ wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 18 }];
  worksheet['!cols'] = maxProps;

  // Generate buffer and trigger download
  XLSX.writeFile(workbook, `Attendance_Report_${selectedDate}.xlsx`);
};

export const exportPayrollToExcel = (payrollData: any[], month: number, year: number) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[month] || 'Month';

  // Map data to table rows
  const rows = payrollData.map(p => {
    const staff = p.staff || {};
    return {
      'Staff Name': staff.name || 'N/A',
      'Staff Type': staff.staffType || 'Regular',
      'Base Salary (INR)': p.basicSalary || 0,
      'Earned Salary (INR)': p.earnedSalary || 0,
      'Present Days': p.presentDays || 0,
      'Paid Leaves': p.paidLeaves || 0,
      'Unpaid Absents': p.unpaidAbsents || 0,
      'Paid Sundays': p.paidSundays || 0,
      'Overtime Hours': p.overtimeHours || 0,
      'Overtime Pay (INR)': p.overtimeAmount || 0,
      'Allowances (INR)': p.allowances || 0,
      'Bonus (INR)': p.bonus || 0,
      'Advances Deducted (INR)': p.advances || 0,
      'Fine / Penalties (INR)': p.deduction || 0,
      'Net Payable (INR)': p.finalPaidAmount || (p.amount || 0),
      'Payment Status': (p.status || 'pending').toUpperCase()
    };
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Payroll');

  // Auto-fit columns
  const maxProps = [
    { wch: 25 }, { wch: 15 }, { wch: 18 }, { wch: 18 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
    { wch: 15 }, { wch: 15 }, { wch: 18 }, { wch: 18 }, { wch: 15 }, { wch: 22 }, { wch: 20 }, { wch: 18 }, { wch: 15 }
  ];
  worksheet['!cols'] = maxProps;

  // Generate buffer and trigger download
  XLSX.writeFile(workbook, `Payroll_Report_${monthName}_${year}.xlsx`);
};
