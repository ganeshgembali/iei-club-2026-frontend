import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Membership from './pages/Membership';
import DiscussionRoom from './pages/DiscussionRoom';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEvents from './pages/admin/ManageEvents';
import ManageUsers from './pages/admin/ManageUsers';
import MembershipRequests from './pages/admin/MembershipRequests';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminSidebar from './components/layout/AdminSidebar';
import AnnouncementsManagement from './pages/admin/AnnouncementsManagement';
import FeedbackViewer from './pages/admin/FeedbackViewer';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${isAdminRoute ? 'lg:flex-row' : ''}`}>
      {isAdminRoute ? <AdminSidebar /> : <Header />}
      
      <div className="flex-grow flex flex-col min-w-0">
        {isAdminRoute && (
          <div className="lg:hidden">
             <Header />
          </div>
        )}
        
        <main className={`flex-grow container mx-auto px-4 py-8 ${isAdminRoute ? 'max-w-7xl' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/membership" element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            } />
            <Route path="/discussion" element={
              <ProtectedRoute>
                <DiscussionRoom />
              </ProtectedRoute>
            } />

            {/* Admin/Committee Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'COMMITTEE']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'COMMITTEE']}>
                <ManageEvents />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ManageUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/memberships" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'COMMITTEE']}>
                <MembershipRequests />
              </ProtectedRoute>
            } />
            <Route path="/admin/announcements" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'COMMITTEE']}>
                <AnnouncementsManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/feedback" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'COMMITTEE']}>
                <FeedbackViewer />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
}

export default App;
