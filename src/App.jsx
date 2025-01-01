import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavBar from './Admin/NavBar'; // Import the Sidebar component
import Aftercare from './pages/Aftercare';
import Classes from './pages/Classes';
import Course1 from './pages/Course1';
import Course2 from './pages/Course2';
import Course3 from './pages/Course3';
import CourseCheckout from './pages/courseCheckout';
import ClassAppointmentPage from './pages/ClassAppointmentPage';
import ClassAppointmentModal from './pages/ClassAppointmentModal';
import BookAppointment from './pages/BookAppointment';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/checkout';
import Footer from './components/Footer';
// Admin components
import Dashboard from './Admin/AdminDashboard';
import Appointments from './Admin/Appointments';
import Services from './Admin/ServicesPage';
import AdminEmployees from './Admin/AdminEmployees';
import AdminClasses from './Admin/AdminClasses';
import Profile from './Admin/Profile';
import Settings from './Admin/Settings';
import Register from './Admin/Register';
import Login from './Admin/Login';
import Admin from './Admin/Admin'; // Import the new Admin component

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

const AppLayout = () => {
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  const PrivateRoute = ({ element, redirectTo }) => {
    const token = localStorage.getItem("adminToken");
    const tokenExpiration = localStorage.getItem("adminTokenExpiration");

    if (!token || Date.now() > tokenExpiration) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminTokenExpiration");
      return <Navigate to={redirectTo} />;
    }

    return element;
  };

  return (
    <div className="app-layout">
      {/* Only render Sidebar for Admin Routes */}
      {isAdminRoute && <NavBar />}

      {/* Main content */}
      <div className="main-content">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/aftercare" element={<Aftercare />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/classic-lash-course" element={<Course1 />} />
          <Route path="/classes/volume-lash-course" element={<Course2 />} />
          <Route path="/classes/advanced-techniques" element={<Course3 />} />
          <Route path="/classes/booking" element={<ClassAppointmentPage />} />
          <Route path="/classes/enrollment" element={<ClassAppointmentModal />} />
          <Route path="/classes/checkout" element={<CourseCheckout />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/book-appointment/cart" element={<Cart />} />
          <Route path="/book-appointment/checkout" element={<Checkout />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute element={<Dashboard />} redirectTo="/admin/login" />}
          />
          <Route
            path="/admin/appointments"
            element={<PrivateRoute element={<Appointments />} redirectTo="/admin/login" />}
          />
          <Route
            path="/admin/services"
            element={<PrivateRoute element={<Services />} redirectTo="/admin/login" />}
          />
          <Route
            path="/admin/employees"
            element={<PrivateRoute element={<AdminEmployees />} redirectTo="/admin/login" />}
          />
          <Route
            path="/admin/classes"
            element={<PrivateRoute element={<AdminClasses />} redirectTo="/admin/login" />}
          />
          <Route
            path="/admin/profile"
            element={<PrivateRoute element={<Profile />} redirectTo="/admin/login" />}
          />
          <Route
            path="/admin/settings"
            element={<PrivateRoute element={<Settings />} redirectTo="/admin/login" />}
          />
        </Routes>

        {/* Render Footer only for non-admin routes */}
        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
};

export default App;
