const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const vhost = require('vhost');
const { Worker } = require('worker_threads');
const fs = require('fs');
const path = require('path');

// Helper to manually parse .env files since process.cwd() is shared in workers
function parseEnv(filePath) {
    const env = {};
    if (fs.existsSync(filePath)) {
        const lines = fs.readFileSync(filePath, 'utf8').split('\n');
        lines.forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
            }
        });
    }
    return env;
}
const cors = require('cors');

const app = express();
app.use(cors());

// --- CONFIGURATION ---
const projects = [
    // ---------------- AUTO ----------------
    {
        id: 'auto-backend',
        domain: 'api.auto.local', // Change to real domain if you have one for auto
        cwd: path.join(__dirname, './Auto/backend'),
        command: 'node',
        args: ['server.js'],
        port: 3001,
        type: 'proxy'
    },
    {
        id: 'auto-frontend',
        domain: 'auto.local', // Change to real domain if you have one for auto
        cwd: path.join(__dirname, './Auto/frontend/build_dist'), 
        type: 'static'
    },
    // ---------------- EMJAY BREWERY ----------------
    {
        id: 'emjay-backend',
        domain: 'api.oms.emjaybrewery.in',
        cwd: path.join(__dirname, './Emjay Brewery/backend'),
        command: 'node',
        args: ['index.js'],
        port: 3002,
        type: 'proxy'
    },
    {
        id: 'emjay-frontend',
        domain: 'oms.emjaybrewery.in',
        cwd: path.join(__dirname, './Emjay Brewery/frontend/build_dist'),
        type: 'static'
    },
    // ---------------- YATREE DESTINATION ----------------
    {
        id: 'yatree-backend',
        domain: 'api.yatreedestination.com',
        cwd: path.join(__dirname, './Smokey Jo\'s Cafe/Yatree- Destination/server'), 
        command: 'node',
        args: ['server.js'], 
        port: 3004,
        type: 'proxy'
    },
    {
        id: 'yatree-frontend',
        domain: 'yatreedestination.com',
        cwd: path.join(__dirname, './Smokey Jo\'s Cafe/Yatree- Destination/client/build_dist'), 
        type: 'static'
    },
    // ---------------- UNNATI ARTS ----------------
    {
        id: 'unnati-backend',
        domain: 'api.unnati.yatreedestination.com',
        cwd: path.join(__dirname, './Unnati Arts/backend'), 
        command: 'node',
        args: ['dist/index.js'],
        port: 3005,
        type: 'proxy'
    },
    {
        id: 'unnati-frontend',
        domain: 'unnati.yatreedestination.com',
        cwd: path.join(__dirname, './Unnati Arts/frontend/build_dist'), 
        type: 'static'
    },
    // ---------------- LOGKARO (TAXI FLEET CRM) ----------------
    {
        id: 'logkaro-backend',
        domain: 'api.logkaro.com',
        cwd: path.join(__dirname, './TEXI/taxi-fleet-crm'), 
        command: 'node',
        args: ['server.js'],
        port: 3006,
        type: 'proxy'
    },
    {
        id: 'logkaro-frontend',
        domain: 'logkaro.com',
        cwd: path.join(__dirname, './TEXI/taxi-fleet-crm/client/build_dist'), 
        type: 'static'
    }
];

console.log("=========================================");
console.log("HOSTINGER DEBUG: Contents of Root Dir:");
try {
    console.log(fs.readdirSync(__dirname));
    console.log("Contents of TEXI:", fs.readdirSync(path.join(__dirname, 'TEXI')));
} catch (e) {
    console.error("DEBUG ERROR:", e.message);
}
console.log("=========================================");

// --- SPAWN PROCESSES & SETUP ROUTING ---
projects.forEach((proj) => {
    if (proj.type === 'proxy') {
        console.log(`Starting ${proj.id} on port ${proj.port}...`);
        
        const scriptPath = path.join(proj.cwd, proj.args[0]);
        const envPath = path.join(proj.cwd, '.env');
        const parsedEnv = parseEnv(envPath);

        // Run backends inside isolated Worker Threads to bypass Hostinger's spawn/fork block
        const worker = new Worker(scriptPath, {
            env: { ...process.env, ...parsedEnv, PORT: proj.port },
            execArgv: [], // Critical: Strip Hostinger's LSNode wrapper from worker threads
            stdout: true,
            stderr: true
        });

        // Forward logs to main console
        worker.stdout.on('data', (data) => console.log(`[${proj.id}] ${data.toString().trim()}`));
        worker.stderr.on('data', (data) => console.error(`[${proj.id} ERROR] ${data.toString().trim()}`));
        worker.on('error', (err) => console.error(`[${proj.id} FATAL]`, err));
        worker.on('exit', (code) => console.log(`[${proj.id}] exited with code ${code}`));

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

// Catch-all fallback to debug if the server is actually responding
app.use((req, res) => {
    res.status(200).send(`<h1>Master Proxy is ALIVE!</h1><p>But no domain matched your request: <b>${req.hostname}</b></p>`);
});

// Start the Master Server
const MASTER_PORT = process.env.PORT || 8080;
app.listen(MASTER_PORT, () => {
    console.log(`\n=========================================`);
    console.log(`MASTER PROXY SERVER RUNNING ON PORT ${MASTER_PORT}`);
    console.log(`=========================================\n`);
});
