# Yatree Auto - Reliable Fleet Management System

A complete, production-ready Fleet Management System built with React, Node.js, and MongoDB.

## Features

### 🔐 Multi-Role Authentication
- Admin and Driver logins with JWT-based security.
- Role-based access control (RBAC) ensuring data privacy.

### 🚗 Auto Management
- Complete CRUD operations for vehicles.
- Track battery status, insurance expiry, and operational status.
- Real-time status indicators (Active, Maintenance, Inactive).

### 👥 Driver Management
- Register and manage drivers.
- Dynamic auto assignment.
- Track driver license numbers and contact details.

### 🛠️ Maintenance & Parts
- Log specific repair instances and parts replacement.
- Track costs and vendor information.
- Automatic reminders for next service dates.

### 📊 Dashboard & Analytics
- Modern UI with visual charts using Chart.js.
- Daily/Monthly earnings tracking.
- Maintenance cost reports.

---

## 🚀 Setup Instructions

### Prerequisites
1.  **Node.js** (v16 or higher)
2.  **MongoDB** (Local or Atlas)

### Step 1: Clone and Install
```bash
# In the project root (Auto)
cd backend
npm install
cd ../frontend
npm install
```

### Step 2: Configure Environment
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fleet_management
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Step 3: Seed Initial Admin
```bash
cd backend
npm run seed
```
**Admin Credentials:**
- Email: `admin@gmail.com`
- Password: `123456`

### Step 4: Run the Application
Open two terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Lucide Icons, Chart.js, Framer Motion.
- **Backend:** Node.js, Express, Mongoose, JWT, Bcrypt.
- **Database:** MongoDB.
- **Style:** Modern Vanilla CSS with industrial tokens.
