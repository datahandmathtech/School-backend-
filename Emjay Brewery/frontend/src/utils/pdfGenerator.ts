import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const getMonthName = (monthIndex: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex] || '';
};

export const generateSalarySlipPDF = (payroll: any, month: number, year: number): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  addSalarySlipPage(doc, payroll, month, year);
  return doc;
};

export const generateBulkSalarySlipsPDF = (payrolls: any[], month: number, year: number): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  payrolls.forEach((payroll, index) => {
    if (index > 0) {
      doc.addPage();
    }
    addSalarySlipPage(doc, payroll, month, year);
  });
  return doc;
};

const addSalarySlipPage = (doc: jsPDF, payroll: any, month: number, year: number) => {
  const staff = payroll.staff || {};
  const monthName = getMonthName(month);
  
  // Outer Border
  doc.rect(5, 5, 200, 287);
  doc.rect(7, 7, 196, 283);

  // Header Banner
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(7, 7, 196, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('EMJAY BREWERY', 15, 22);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PAYROLL MANAGEMENT SYSTEM - SALARY SLIP', 15, 28);
  
  doc.setFont('helvetica', 'bold');
  doc.text(`STATEMENT PERIOD: ${monthName.toUpperCase()} ${year}`, 130, 22);

  // Info Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  // Left Column Info
  doc.setFont('helvetica', 'bold');
  doc.text('EMPLOYEE DETAILS', 15, 42);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${staff.name || 'N/A'}`, 15, 48);
  doc.text(`Mobile: ${staff.mobile || 'N/A'}`, 15, 54);
  doc.text(`Designation: ${staff.designation || 'N/A'}`, 15, 60);
  doc.text(`Staff Type: ${staff.staffType || 'Regular'}`, 15, 66);

  // Right Column Info
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT METRICS', 115, 42);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cycle Dates: ${payroll.cycleStart || `01/${String(month + 1).padStart(2, '0')}/${year}`} to ${payroll.cycleEnd || `${new Date(year, month + 1, 0).getDate()}/${String(month + 1).padStart(2, '0')}/${year}`}`, 115, 48);
  doc.text(`Cycle Length: ${payroll.totalDaysInCycle || 30} Days`, 115, 54);
  doc.text(`Joining Date: ${staff.joiningDate ? new Date(staff.joiningDate).toLocaleDateString('en-GB') : 'N/A'}`, 115, 60);
  doc.text(`Payment Status: ${(payroll.status || 'pending').toUpperCase()}`, 115, 66);

  // Divider Line
  doc.setDrawColor(200, 200, 200);
  doc.line(15, 72, 195, 72);

  // Attendance Metrics Table
  doc.setFont('helvetica', 'bold');
  doc.text('ATTENDANCE SUMMARY', 15, 80);
  
  const presentDays = payroll.presentDays || 0;
  const paidLeaves = payroll.paidLeaves || 0;
  const unpaidAbsents = payroll.unpaidAbsents || 0;
  const paidSundays = payroll.paidSundays || 0;
  const unpaidSundays = payroll.unpaidSundays || 0;
  const overtimeHours = payroll.overtimeHours || 0;
  
  (doc as any).autoTable({
    startY: 84,
    margin: { left: 15, right: 15 },
    head: [['Present Days', 'Paid Leaves', 'Unpaid Absents', 'Paid Sundays', 'Unpaid Sundays', 'Overtime (Hrs)']],
    body: [[
      presentDays,
      paidLeaves,
      unpaidAbsents,
      paidSundays,
      unpaidSundays,
      overtimeHours
    ]],
    theme: 'grid',
    headStyles: { fillColor: [71, 85, 105], textColor: [255, 255, 255], fontStyle: 'bold' },
    bodyStyles: { halign: 'center', fontStyle: 'bold' },
    styles: { fontSize: 9 }
  });

  // Financial Breakdown Table
  const startYFinancial = (doc as any).lastAutoTable.finalY + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('FINANCIAL BREAKDOWN', 15, startYFinancial);

  const basicSalary = payroll.basicSalary || 0;
  const earnedSalary = payroll.earnedSalary || 0;
  const overtimeAmount = payroll.overtimeAmount || 0;
  const allowances = payroll.allowances || 0;
  const bonus = payroll.bonus || 0;
  const advances = payroll.advances || 0;
  const deduction = payroll.deduction || 0;
  const netPayable = payroll.amount || (earnedSalary + allowances - advances);
  const finalPaid = payroll.finalPaidAmount || (netPayable + bonus - deduction);

  const financialHeaders = [['Description', 'Earnings (INR)', 'Deductions (INR)']];
  const financialRows = [
    ['Base Salary (Full Month)', basicSalary.toFixed(2), '-'],
    ['Earned Salary (Attendance-based)', earnedSalary.toFixed(2), '-'],
    ['Overtime Allowance', overtimeAmount.toFixed(2), '-'],
    ['Other Allowances / Extra Duty', allowances.toFixed(2), '-'],
    ['Bonus', bonus.toFixed(2), '-'],
    ['Salary Advances / Loans', '-', advances.toFixed(2)],
    ['Fine / Penalty Deductions', '-', deduction.toFixed(2)],
  ];

  (doc as any).autoTable({
    startY: startYFinancial + 4,
    margin: { left: 15, right: 15 },
    head: financialHeaders,
    body: financialRows,
    theme: 'striped',
    headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { halign: 'right', fontStyle: 'bold' },
      2: { halign: 'right', fontStyle: 'bold', textColor: [220, 38, 38] }
    },
    styles: { fontSize: 9 }
  });

  // Net Payout Box
  const startYSummary = (doc as any).lastAutoTable.finalY + 8;
  doc.setFillColor(248, 250, 252);
  doc.rect(15, startYSummary, 180, 24, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, startYSummary, 180, 24);

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Final Net Payable (Earned Salary + Allowances + Bonus - Advances - Fine):', 20, startYSummary + 10);
  
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`INR ${finalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, startYSummary + 18);

  // Signature lines
  const startYSign = startYSummary + 45;
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);
  
  // Line 1
  doc.line(20, startYSign, 70, startYSign);
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text('Prepared By (HR/Finance)', 20, startYSign + 5);

  // Line 2
  doc.line(80, startYSign, 130, startYSign);
  doc.text('Approved By (Manager/Owner)', 80, startYSign + 5);

  // Line 3
  doc.line(140, startYSign, 190, startYSign);
  doc.text('Employee Signature', 140, startYSign + 5);

  // Footer Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('This is a computer-generated salary slip and does not require a physical signature unless requested.', 15, 275);
  doc.text('Emjay Brewery © All Rights Reserved.', 15, 280);
};
