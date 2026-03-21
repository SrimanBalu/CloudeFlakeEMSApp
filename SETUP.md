# Employee Management System - Quick Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Installation Steps

1. **Clone or navigate to project directory**
   ```bash
   cd employee-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   The app will open automatically at `http://localhost:3000`

4. **Login with demo credentials**
   - Username: `admin`
   - Password: `1234`

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.js       # Top navigation bar
│   ├── EmployeeForm.js # Employee form with validation
│   └── EmployeeTable.js # Employee table display
│
├── pages/              # Page components
│   ├── Login.js        # Authentication page
│   ├── Dashboard.js    # Welcome/home page
│   └── EmployeeManagement.js # Main CRUD page
│
├── services/           # API and utility functions
│   └── api.js         # Axios API client
│
├── App.js             # Main app with routing
├── index.js           # React entry point
└── index.css          # Global styles
```

## 🔧 Key Features

### 1. Authentication
- Login page with form validation
- Demo credentials: admin / 1234
- Session persistence with localStorage
- Protected routes

### 2. Employee CRUD Operations
- **Create**: Add new employees with validation
- **Read**: View all employees in table
- **Update**: Edit existing employee details
- **Delete**: Remove employees with confirmation

### 3. Search & Filter
- Real-time search by name
- Real-time search by email
- Instant filtering results

### 4. Form Validation
- Name: Required
- Age: Required, > 18
- Department: Required
- Email: Required, valid format
- Phone: Required, 10 digits

## 📋 Complete File List

### Core Files
- `package.json` - Dependencies and scripts
- `public/index.html` - HTML entry point
- `src/index.js` - React initialization
- `src/App.js` - Routing and auth logic
- `src/index.css` - Global styles

### Components
- `src/components/Navbar.js` - Navigation header
- `src/components/EmployeeForm.js` - Form with validation
- `src/components/EmployeeTable.js` - Data table

### Pages
- `src/pages/Login.js` - Login page (auth)
- `src/pages/Dashboard.js` - Home/welcome page
- `src/pages/EmployeeManagement.js` - Employee CRUD

### Services
- `src/services/api.js` - Axios API client

### Config Files
- `.env.example` - Environment variable template
- `.gitignore` - Git ignore rules
- `README.md` - Full documentation

## 🔌 API Connection

The app connects to backend at: `http://localhost:5000/api`

**Endpoints used:**
- `POST /employees` - Create employee
- `GET /employees` - Get all employees
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

## ⚙️ Configuration

### Change API Base URL

Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

Or create `.env` file:
```
REACT_APP_API_URL=http://your-backend-url/api
```

## 🎨 UI/UX Features

- Bootstrap 5 responsive design
- Purple gradient theme
- Smooth animations
- Loading spinners
- Success/error alerts
- Mobile-friendly layout
- Bootstrap grid system

## 📱 Responsive Design

- Desktop: Full layout with sidebar
- Tablet: Adjusted grid layout
- Mobile: Stack layout, full width

## 🧪 Testing the Application

1. **Test Login**
   - Try with empty fields (validation)
   - Try wrong credentials
   - Login with admin/1234

2. **Test Employee Management**
   - Add employee (test validation)
   - Search employees
   - Edit employee
   - Delete employee

3. **Test Forms**
   - Test all validation rules
   - Test form reset
   - Test success messages

## 🐛 Debugging

### Browser Console
- Open DevTools (F12)
- Check Console tab for errors
- Network tab to see API calls

### Common Issues
1. **"Cannot GET /api/employees"**
   - Backend server is not running
   - Check if backend is on http://localhost:5000

2. **401 Unauthorized**
   - API authentication required
   - Check API credentials

3. **Port 3000 already in use**
   ```bash
   PORT=3001 npm start
   ```

## 📦 Dependencies

- `react@18.2.0` - UI framework
- `react-router-dom@6.8.0` - Routing
- `axios@1.3.0` - HTTP client
- `bootstrap@5.2.3` - CSS framework

## 🚀 Build for Production

```bash
npm run build
```

This creates optimized production build in `build/` folder.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [Bootstrap Documentation](https://getbootstrap.com)

---

**Ready to use! Just run `npm install` then `npm start`** ✨
