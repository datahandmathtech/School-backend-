const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const vhost = require('vhost');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// --- CONFIGURATION ---
const projects = [
    // ---------------- AUTO ----------------
    {
        id: 'auto-backend',
        domain: 'api.auto.local', // Change to real domain if you have one for auto
        cwd: path.join(__dirname, '../Auto/backend'),
        command: 'node',
        args: ['server.js'],
        port: 3001,
        type: 'proxy'
    },
    {
        id: 'auto-frontend',
        domain: 'auto.local', // Change to real domain if you have one for auto
        cwd: path.join(__dirname, '../Auto/frontend/dist'), 
        type: 'static'
    },
    // ---------------- EMJAY BREWERY ----------------
    {
        id: 'emjay-backend',
        domain: 'api.oms.emjaybrewery.in',
        cwd: path.join(__dirname, '../Emjay Brewery/backend'),
        command: 'node',
        args: ['index.js'],
        port: 3002,
        type: 'proxy'
    },
    {
        id: 'emjay-frontend',
        domain: 'oms.emjaybrewery.in',
        cwd: path.join(__dirname, '../Emjay Brewery/frontend/out'),
        type: 'static'
    },
    // ---------------- YATREE DESTINATION ----------------
    {
        id: 'yatree-backend',
        domain: 'api.yatreedestination.com',
        cwd: path.join(__dirname, '../TEXI/yatree-backend'), 
        command: 'node',
        args: ['server.js'], 
        port: 3004,
        type: 'proxy'
    },
    {
        id: 'yatree-frontend',
        domain: 'yatreedestination.com',
        cwd: path.join(__dirname, '../TEXI/yatree-frontend-/dist'), 
        type: 'static'
    },
    // ---------------- UNNATI ARTS ----------------
    {
        id: 'unnati-backend',
        domain: 'api.unnati.yatreedestination.com',
        cwd: path.join(__dirname, '../Unnati Arts/backend'), 
        command: 'node',
        args: ['dist/index.js'],
        port: 3005,
        type: 'proxy'
    },
    {
        id: 'unnati-frontend',
        domain: 'unnati.yatreedestination.com',
        cwd: path.join(__dirname, '../Unnati Arts/frontend/dist'), 
        type: 'static'
    },
    // ---------------- LOGKARO (TAXI FLEET CRM) ----------------
    {
        id: 'logkaro-backend',
        domain: 'api.logkaro.com',
        cwd: path.join(__dirname, '../TEXI/taxi-fleet-crm'), 
        command: 'node',
        args: ['server.js'],
        port: 3006,
        type: 'proxy'
    },
    {
        id: 'logkaro-frontend',
        domain: 'logkaro.com',
        cwd: path.join(__dirname, '../TEXI/taxi-fleet-crm/client/dist'), 
        type: 'static'
    }
];

// --- SPAWN PROCESSES & SETUP ROUTING ---
projects.forEach((proj) => {
    if (proj.type === 'proxy') {
        console.log(`Starting ${proj.id} on port ${proj.port}...`);
        
        // Spawn the child process
        const child = spawn(proj.command, proj.args, {
            cwd: proj.cwd,
            env: { ...process.env, PORT: proj.port }, // Override the port dynamically
            shell: true // Required on Windows for commands like npm
        });

        // Forward logs to main console
        child.stdout.on('data', (data) => console.log(`[${proj.id}] ${data.toString().trim()}`));
        child.stderr.on('data', (data) => console.error(`[${proj.id} ERROR] ${data.toString().trim()}`));
        child.on('close', (code) => console.log(`[${proj.id}] exited with code ${code}`));

        // Set up Express vhost to proxy traffic
        const proxyApp = express();
        proxyApp.use('/', createProxyMiddleware({
            target: `http://localhost:${proj.port}`,
            changeOrigin: true,
            ws: true, // For websocket support if needed
            logLevel: 'error'
        }));
        app.use(vhost(proj.domain, proxyApp));
        console.log(`Mapped domain ${proj.domain} -> Proxy to Port ${proj.port}`);

    } else if (proj.type === 'static') {
        // Serve Static Files (For React/Vite dist folders)
        const staticApp = express();
        staticApp.use(express.static(proj.cwd));
        
        // Fallback for React Router (SPA)
        staticApp.get('/*', (req, res) => {
            res.sendFile(path.join(proj.cwd, 'index.html'));
        });

        app.use(vhost(proj.domain, staticApp));
        console.log(`Mapped domain ${proj.domain} -> Static folder ${proj.cwd}`);
    }
});

// Start the Master Server
const MASTER_PORT = process.env.PORT || 8080;
app.listen(MASTER_PORT, () => {
    console.log(`\n=========================================`);
    console.log(`MASTER PROXY SERVER RUNNING ON PORT ${MASTER_PORT}`);
    console.log(`=========================================\n`);
});
