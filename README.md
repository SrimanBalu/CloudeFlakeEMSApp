# Employee Management System - React Frontend

A complete React.js frontend for an Employee Management System with authentication, CRUD operations, and a responsive UI built with Bootstrap.

## Features

- ✅ **Authentication**: Login page with hardcoded credentials (admin / 1234)
- ✅ **Responsive Design**: Mobile-friendly UI using Bootstrap
- ✅ **Employee Management**: Add, edit, delete, and search employees
- ✅ **Form Validation**: Real-time validation with error messages
- ✅ **API Integration**: Axios for seamless API communication
- ✅ **Protected Routes**: Authentication-based navigation
- ✅ **Loading States**: Spinners and loading indicators
- ✅ **Clean Architecture**: Organized folder structure with components, pages, and services

## Project Structure

```
employee-management-system/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Navigation bar component
│   │   ├── EmployeeForm.js        # Reusable employee form
│   │   └── EmployeeTable.js       # Employee list table
│   ├── pages/
│   │   ├── Login.js               # Login page
│   │   ├── Dashboard.js           # Welcome dashboard
│   │   └── EmployeeManagement.js  # Employee CRUD page
│   ├── services/
│   │   └── api.js                 # Axios API service
│   ├── App.js                     # Main app component with routing
│   ├── index.js                   # React entry point
│   ├── index.css                  # Global styles
├── package.json
├── .gitignore
└── README.md
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Usage

### Login Credentials (Demo)
- **Username**: sriman@gmail.com
- **Password**: Sriram@123

### Pages Overview

#### 1. Login Page (`/login`)
- Username and password fields
- Form validation (no empty fields)
- Hardcoded credentials for demo
- Redirects to dashboard on successful login

#### 2. Dashboard Page (`/dashboard`)
- Welcome message with username
- Quick start guide
- Navigation to Employee Management
- Employee statistics overview

#### 3. Employee Management Page (`/employees`)

**Add/Edit Employee Form:**
- Name (required)
- Age (required, must be > 18)
- Department (required)
- Email (required, valid email format)
- Phone (required, 10 digits)

**Employee Table:**
- Displays all employees with columns: Name, Age, Department, Email, Phone
- **Edit Button**: Pre-fills form with selected employee data to update via PUT API
- **Delete Button**: Shows confirmation dialog before deleting
- **Search**: Real-time filtering by name or email

## API Integration

The `services/api.js` file provides methods for:

```javascript
// Get all employees
employeeAPI.getAllEmployees()

// Get employee by ID
employeeAPI.getEmployeeById(id)

// Create new employee
employeeAPI.createEmployee(employeeData)

// Update employee
employeeAPI.updateEmployee(id, employeeData)

// Delete employee
employeeAPI.deleteEmployee(id)

// Search employees
employeeAPI.searchEmployees(query)
```

**Base URL**: `http://localhost:5000/api`

## Backend API Endpoints Required

```
POST   /api/employees              # Create employee
GET    /api/employees              # Get all employees
GET    /api/employees/:id          # Get employee by ID
PUT    /api/employees/:id          # Update employee
DELETE /api/employees/:id          # Delete employee
GET    /api/employees/search?q=    # Search employees
```

## Form Validation

The form includes comprehensive validation:

✅ Name - Required field
✅ Age - Required, must be greater than 18
✅ Department - Required field
✅ Email - Required, valid email format
✅ Phone - Required, exactly 10 digits

## Technologies Used

- **React 18.2**: UI library
- **React Router 6.8**: Client-side routing
- **Axios 1.3**: HTTP client
- **Bootstrap 5.2**: CSS framework
- **React Hooks**: useState, useEffect for state management

## Features Implemented

1. **Authentication**
   - Login with session persistence (localStorage)
   - Protected routes based on authentication status
   - Logout functionality

2. **Employee Management**
   - Create new employees with validation
   - Edit existing employees
   - Delete employees with confirmation
   - Real-time search filtering

3. **User Experience**
   - Responsive design for all devices
   - Loading states during API calls
   - Success/error message alerts
   - Form reset after submission
   - Smooth scrolling to form on edit

4. **Error Handling**
   - API error messages
   - Form validation errors
   - Network error handling
   - User-friendly error alerts

## Styling

- **Global Styles**: `src/index.css` contains all custom styles
- **Bootstrap Integration**: Bootstrap classes for responsive design
- **Custom Gradients**: Modern gradient backgrounds
- **Color Scheme**: Professional purple gradient theme
- **Mobile Responsive**: Mobile-first responsive design

## Security Notes

⚠️ **Demo Credentials**: The login credentials (admin/1234) are hardcoded for demo purposes only. In production:
- Implement proper authentication with backend
- Use JWT tokens
- Secure password hashing
- HTTPS only

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

```bash
npm start       # Start development server
npm build       # Build for production
npm test        # Run tests
npm eject       # Eject from Create React App (not reversible)
```

## Environment Variables

Create a `.env` file in the root directory (optional):

```
REACT_APP_API_URL=http://localhost:5000/api
```

Update `src/services/api.js` to use `process.env.REACT_APP_API_URL` if needed.

## Troubleshooting

### Port Already in Use
```bash
# Change port
PORT=3001 npm start
```

### API Connection Issues
- Ensure backend server is running on `http://localhost:5000`
- Check CORS configuration on backend
- Check network tab in browser DevTools

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Future Enhancements

- Employee performance dashboard
- Reports and analytics
- Email notifications
- File upload for employee photos
- Multi-language support
- Dark mode
- Advanced search filters
- Pagination for large datasets

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please check the console logs and ensure:
1. Backend API is running
2. All dependencies are installed
3. React development server is running on port 3000
4. No CORS issues between frontend and backend
