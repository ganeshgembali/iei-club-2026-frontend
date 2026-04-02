import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Calendar, FileText, CheckCircle, Clock, User, ArrowRight, ChevronRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ registeredEvents: [], membershipStatus: 'NOT_APPLIED' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/users/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback dummy
        setStats({
          registeredEvents: [
            { id: '1', title: 'AI Workshop', date: '2026-03-25', status: 'CONFIRMED' },
            { id: '2', title: 'Tech Symposium', date: '2026-05-15', status: 'WAITLISTED' }
          ],
          membershipStatus: 'PENDING'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Student Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, <span className="font-bold text-slate-700">{user?.name}</span>!</p>
        </div>
        <Link to="/profile" className="flex items-center space-x-2 text-primary bg-primary/5 px-4 py-2 rounded-xl font-bold hover:bg-primary/10 transition-all">
          <User size={18} />
          <span>Edit Profile</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Membership Status Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${
              stats.membershipStatus === 'APPROVED' ? 'bg-green-50 text-green-600' : 
              stats.membershipStatus === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
            }`}>
               <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">IEI Membership</h3>
            <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 ${
               stats.membershipStatus === 'APPROVED' ? 'bg-green-100 text-green-700' : 
               stats.membershipStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'
            }`}>
              {stats.membershipStatus}
            </div>
            {stats.membershipStatus === 'NOT_APPLIED' && (
              <Link to="/membership" className="text-primary font-bold text-sm flex items-center hover:underline">
                Apply Now <ChevronRight size={16} />
              </Link>
            )}
        </div>

        {/* Quick Stats */}
        {[
          { label: 'Events Registered', value: stats.registeredEvents.length, icon: <Calendar className="text-blue-600" />, color: 'bg-blue-50' },
          { label: 'Notifications', value: '3 New', icon: <Bell className="text-purple-600" />, color: 'bg-purple-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
               {item.icon}
             </div>
             <div className="text-3xl font-black text-slate-800 mb-1">{item.value}</div>
             <div className="text-slate-500 font-semibold text-sm">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Registrations */}
        <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100">
           <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-primary">My Registrations</h2>
              <Link to="/events" className="text-slate-400 hover:text-primary transition-colors"><ArrowRight size={20} /></Link>
           </div>
           
           <div className="space-y-4">
             {stats.registeredEvents.length > 0 ? stats.registeredEvents.map((evt) => (
               <div key={evt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-center space-x-4">
                     <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm text-primary"><Calendar size={18} /></div>
                     <div>
                        <div className="font-bold text-slate-700">{evt.title}</div>
                        <div className="text-xs text-slate-500 font-medium">{new Date(evt.date).toLocaleDateString()}</div>
                     </div>
                  </div>
                  <div className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                    evt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {evt.status}
                  </div>
               </div>
             )) : (
               <div className="text-center py-8 text-slate-400">No active registrations</div>
             )}
           </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100">
           <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-primary">Notifications</h2>
              <div className="bg-primary/5 p-2 rounded-lg text-primary"><Bell size={18} /></div>
           </div>
           
           <div className="space-y-6">
              {[
                { title: 'Certification update for Python workshop', time: '2h ago', icon: <CheckCircle className="text-green-500" /> },
                { title: 'New event: Civil Conclave 2026', time: '1d ago', icon: <ArrowRight className="text-blue-500" /> },
                { title: 'Membership renewal reminder', time: '3d ago', icon: <Clock className="text-amber-500" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4 animate-in fade-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                   <div className="mt-1 shrink-0">{item.icon}</div>
                   <div>
                      <div className="text-sm font-bold text-slate-700 leading-snug">{item.title}</div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase mt-1">{item.time}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
