import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Menu, X, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={isAdminRoute ? "/admin" : "/"} className="flex items-center space-x-3">
            <img src="/logo.png" alt="IEI Logo" className="w-12 h-12 object-contain" />
            <span className="font-black text-primary text-base md:text-lg tracking-tight">
              {isAdminRoute ? "Admin Console" : "VIT-AP IEI Chapter"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isAdminRoute && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-slate-600 hover:text-primary transition-colors font-bold">Home</Link>
              <Link to="/events" className="text-slate-600 hover:text-primary transition-colors font-bold">Events</Link>
              <Link to="/membership" className="text-slate-600 hover:text-primary transition-colors font-bold">Membership</Link>
              <Link to="/about" className="text-slate-600 hover:text-primary transition-colors font-bold">About</Link>
            </nav>
          )}

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-primary hover:bg-slate-50 p-2 rounded-full transition-all">
                    <LayoutDashboard size={20} />
                  </Link>
                )}
                <Link to="/dashboard" className="text-slate-600 hover:text-primary transition-colors">
                  <User size={20} />
                </Link>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-all flex items-center space-x-2 font-bold"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 font-bold">
                <Link to="/login" className="text-slate-600 hover:text-primary transition-colors">Login</Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-all shadow-sm">
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600 p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            {isAdminRoute ? (
              <>
                <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-2">Admin Navigation</div>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Overview</Link>
                <Link to="/admin/events" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Manage Events</Link>
                <Link to="/admin/users" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">User Directory</Link>
                <Link to="/admin/memberships" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Memberships</Link>
                <Link to="/admin/announcements" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Announcements</Link>
                <Link to="/admin/feedback" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">View Feedback</Link>
                
                <div className="border-t border-slate-100 my-2 pt-2">
                  <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-primary hover:bg-slate-50 rounded-xl font-bold">Back to Main Website</Link>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); navigate('/'); }} 
                    className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-bold"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Home</Link>
                <Link to="/events" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Events</Link>
                <Link to="/membership" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Membership</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">About</Link>
                
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold">Dashboard</Link>
                    <button 
                      onClick={() => { logout(); setIsOpen(false); navigate('/'); }} 
                      className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-bold"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-center">Login</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-center shadow-sm">Join Now</Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
