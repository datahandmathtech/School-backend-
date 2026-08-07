const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const mongoose = require('mongoose');

async function testUpload() {
    try {
        // Need to login to get token
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@yatree.com',
            password: 'password'
        });
        const token = loginRes.data.token;

        // Create a dummy text file to act as an image for testing
        fs.writeFileSync('dummy.jpg', 'fake image content');

        const form = new FormData();
        form.append('autoNumber', 'TEST1234');
        form.append('model', 'Test Model');
        form.append('rcPhoto', fs.createReadStream('dummy.jpg'));
        form.append('insurancePhoto', fs.createReadStream('dummy.jpg'));

        const res = await axios.post('http://localhost:5000/api/autos', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}
testUpload();
