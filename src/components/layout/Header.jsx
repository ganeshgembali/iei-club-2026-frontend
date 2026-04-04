import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Menu, X, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="IEI Logo" className="w-12 h-12 object-contain" />
            <span className="font-bold text-primary hidden md:inline text-lg tracking-tight">VIT-AP IEI Chapter</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-primary transition-colors">Home</Link>
            <Link to="/events" className="text-slate-600 hover:text-primary transition-colors">Events</Link>
            <Link to="/membership" className="text-slate-600 hover:text-primary transition-colors">Membership</Link>

            <Link to="/about" className="text-slate-600 hover:text-primary transition-colors">About</Link>
          </nav>

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
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-all flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-slate-600 hover:text-primary transition-colors">Login</Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-all shadow-sm">
                  Join Now
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <Link to="/" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Home</Link>
            <Link to="/events" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Events</Link>
            <Link to="/membership" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Membership</Link>

            <Link to="/about" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">About</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Dashboard</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">Logout</button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/login" className="px-4 py-2 text-slate-600 text-center">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-lg text-center shadow-sm">Join Now</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
