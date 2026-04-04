import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, TrendingUp, Plus, ArrowRight, UserCheck, MessageSquare } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    pendingMemberships: 0,
    recentRegistrations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  const cards = [
    { label: 'Total Students', value: stats.totalUsers, icon: <Users />, color: 'bg-blue-500', link: '/admin/users' },
    { label: 'Active Events', value: stats.totalEvents, icon: <Calendar />, color: 'bg-indigo-500', link: '/admin/events' },
    { label: 'Pending Apps', value: stats.pendingMemberships, icon: <FileText />, color: 'bg-amber-500', link: '/admin/memberships' },
    { label: 'New Signups', value: '+'+stats.recentRegistrations, icon: <TrendingUp />, color: 'bg-emerald-500', link: '/admin/users' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary">Admin Control Center</h1>
          <p className="text-slate-500 mt-1">Management overview for IEI Student Chapter</p>
        </div>
        <div className="flex space-x-3">
           <Link to="/admin/events" className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-primary-light transition-all">
             <Plus size={20} className="mr-2" />
             Create Event
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
             <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500`}></div>
             <div className={`${card.color} text-white p-3 rounded-2xl w-fit mb-6 shadow-lg shadow-${card.color.split('-')[1]}-200`}>
               {card.icon}
             </div>
             <div className="text-3xl font-black text-slate-800 mb-1">{card.value}</div>
             <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100">
              <h3 className="text-xl font-bold text-primary mb-8 border-b border-slate-100 pb-4">Management Actions</h3>
              <div className="space-y-2">
                 {[
                   { label: 'Manage Events', icon: <Calendar size={18} />, link: '/admin/events' },
                   { label: 'Review Memberships', icon: <UserCheck size={18} />, link: '/admin/memberships' },
                   { label: 'User Permissions', icon: <Shield size={18} />, link: '/admin/users' },
                   { label: 'Broadcast Message', icon: <MessageSquare size={18} />, link: '/admin/announcements' },
                 ].map((action, i) => (
                    <Link 
                      key={i} 
                      to={action.link} 
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-primary hover:text-white transition-all group"
                    >
                       <div className="flex items-center space-x-3">
                          <span className="text-primary group-hover:text-white">{action.icon}</span>
                          <span className="font-bold text-sm">{action.label}</span>
                       </div>
                       <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                 ))}
              </div>
           </div>
        </div>

        {/* Recent Activity Table */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="text-xl font-bold text-primary">Recent Activity</h3>
                 <button className="text-xs font-black text-primary hover:underline uppercase tracking-tighter">View Detailed Log</button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100">
                          <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">User</th>
                          <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Action</th>
                          <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                          <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Time</th>
                       </tr>
                    </thead>
                     <tbody className="divide-y divide-slate-50">
                       {stats.recentActivity && stats.recentActivity.length > 0 ? (
                         stats.recentActivity.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-8 py-5">
                                <div className="font-bold text-slate-700 text-sm">{row.user}</div>
                             </td>
                             <td className="px-8 py-5">
                                <div className="text-slate-500 font-semibold text-sm">{row.action}</div>
                             </td>
                             <td className="px-8 py-5">
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                                  row.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 
                                  row.status === 'ADMIN' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                   {row.status}
                                </span>
                             </td>
                             <td className="px-8 py-5 text-right font-medium text-slate-400 text-xs">
                                {row.time}
                             </td>
                          </tr>
                         ))
                       ) : (
                          <tr>
                             <td colSpan="4" className="px-8 py-8 text-center text-slate-400 font-medium">No recent activity detected.</td>
                          </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon proxy
const Shield = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

export default AdminDashboard;
