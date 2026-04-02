import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Bell, 
  MessageSquare,
  Shield,
  ChevronRight,
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    { label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { label: 'Manage Events', icon: <Calendar size={20} />, path: '/admin/events' },
    { label: 'User Directory', icon: <Users size={20} />, path: '/admin/users' },
    { label: 'Memberships', icon: <FileText size={20} />, path: '/admin/memberships' },
    { label: 'Announcements', icon: <Bell size={20} />, path: '/admin/announcements' },
    { label: 'View Feedback', icon: <MessageSquare size={20} />, path: '/admin/feedback' },
  ];

  return (
    <aside className="w-72 bg-white h-screen sticky top-0 border-r border-slate-100 hidden lg:flex flex-col p-8">
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-2">
           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">IEI</div>
           <span className="font-black text-primary tracking-tight">Admin Console</span>
        </div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-11">Student Chapter</p>
      </div>

      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center justify-between p-4 rounded-2xl transition-all font-bold group
              ${isActive 
                ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
            `}
          >
            <div className="flex items-center space-x-3">
               <span className={({ isActive }) => isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'}>
                 {item.icon}
               </span>
               <span className="text-sm">{item.label}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 space-y-2">
         <button 
           onClick={() => navigate('/')}
           className="w-full flex items-center space-x-3 p-4 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-all font-bold group"
         >
           <Home size={20} className="text-slate-400 group-hover:text-primary" />
           <span className="text-sm">Back to Website</span>
         </button>
         <button 
           onClick={() => { logout(); navigate('/'); }}
           className="w-full flex items-center space-x-3 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold group"
         >
           <LogOut size={20} className="text-red-400 group-hover:text-red-600" />
           <span className="text-sm">Logout</span>
         </button>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100">
         <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl">
            <Shield className="text-primary" size={20} />
            <div>
               <div className="text-[10px] font-black text-slate-400 uppercase">Security Status</div>
               <div className="text-xs font-black text-green-600">Active Session</div>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
