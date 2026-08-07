const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/emjay').then(async () => {
  const Order = require('./backend/models/Order');
  const CashLog = require('./backend/models/CashLog');
  const BankLog = require('./backend/models/BankLog');
  const orders = await Order.find();
  console.log('Total Orders:', orders.length);
  orders.forEach(o => console.log('Order:', o._id, o.paymentMode, 'Total:', o.totalAmount, 'Paid:', o.paidAmount, 'PaidOnline:', o.paidOnline, 'PaidCash:', o.paidCash));
  
  const cashLogs = await CashLog.find();
  console.log('Total CashLogs:', cashLogs.length);
  cashLogs.forEach(c => console.log('CashLog:', c._id, c.category, c.amount, c.paymentMode, c.referenceId));

  const bankLogs = await BankLog.find();
  console.log('Total BankLogs:', bankLogs.length);
  bankLogs.forEach(b => console.log('BankLog:', b._id, b.category, b.amount, b.paymentMode, b.referenceId));

  process.exit(0);
});
