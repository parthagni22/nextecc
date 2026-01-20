# Nextec EdTech Dashboard

A professional EdTech dashboard prototype for investor demo, featuring Microsoft certification courses with Nextec branding.

## Features

- **Landing Page**: Hero section with company tagline "Learn. Grow. Thrive." and stats (500+ Faculty, 5000+ Titles, 500,000+ Students)
- **User Authentication**: Registration and login for Participants and Admins
- **Student Dashboard**:
  - Browse 7 Microsoft certification courses
  - View detailed course information in modal
  - Download course curriculum as PDF
  - Enroll in courses
  - View upcoming classes calendar (after enrollment)
- **Admin Dashboard**:
  - View platform statistics
  - Course catalog overview
  - Placeholder for future features
- **Responsive Design**: Mobile-friendly interface

## Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **PDF Generation**: jsPDF

## Brand Colors

- **Gold**: #ffb606 (Primary)
- **Purple**: #442e66 (Secondary)
- **Blue**: #066aab (Accent)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

## Demo Credentials

### Admin Access
- **Email**: admin@nextec.com
- **Password**: admin123
- **Role**: Admin

### Participant Access
- Register a new account or use any registered user credentials
- **Role**: Participant

## Available Courses

1. Microsoft Azure Administrator (AZ-104)
2. Microsoft 365 Fundamentals
3. Azure Fundamentals (AZ-900)
4. Power BI Data Analyst
5. Azure Data Engineer
6. Microsoft Security, Compliance (SC-900)
7. Azure AI Fundamentals

## Project Structure

```
nextec-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CourseCard.jsx
│   │   ├── CourseModal.jsx
│   │   ├── Calendar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── RegistrationPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── coursesData.js
│   ├── utils/
│   │   └── pdfGenerator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Features Walkthrough

### 1. Landing Page
- Navigate to the homepage
- View company stats and features
- Click "Register" or "Login" to get started

### 2. Registration
- Fill in the registration form
- Password must be at least 6 characters
- Passwords must match
- Valid email required

### 3. Login
- Select role (Participant or Admin)
- Enter credentials
- Redirects to appropriate dashboard

### 4. Student Dashboard
- View all available courses
- Click on a course card to see details
- Download curriculum as PDF
- Enroll in courses
- View upcoming classes calendar (appears after first enrollment)

### 5. Admin Dashboard
- View platform statistics
- See course catalog overview
- Access to future admin features (placeholder)

## Data Storage

All data is stored in browser's localStorage:
- **nextec_users**: Array of registered users
- **nextec_user**: Currently logged-in user

## Future Enhancements

- User profile management
- Progress tracking
- Certificates generation
- Payment integration
- Live class integration
- Course completion tracking
- Student performance analytics
- Email notifications

## License

This is a demo project for investor presentation.

## Support

For questions or issues, please contact the development team.
