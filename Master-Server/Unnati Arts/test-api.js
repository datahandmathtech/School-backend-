const http = require('http');

const data = JSON.stringify({
  stage: 'Packing',
  quantityProduced: 2,
  transactionType: 'IN',
  startPhotos: { machine: 'fake', unit: '', software: '' },
  workerId: '66a4f9b0f34343a411111111',
  parentLogId: '66a4f9b0f34343a422222222',
  source: 'Material Tracking'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/production/material-log',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', res.statusCode, body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
