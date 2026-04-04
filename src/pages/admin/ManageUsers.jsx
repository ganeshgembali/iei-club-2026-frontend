import React, { useState, useEffect } from 'react';
import { Search, User, UserCog, Shield, ShieldAlert, CheckCircle, XCircle, MoreVertical, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load user directory');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (userId, newRole) => {
        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole });
            toast.success(`Role updated to ${newRole}`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100 gap-4">
                <div>
                   <h1 className="text-3xl font-black text-primary">User Directory</h1>
                   <p className="text-slate-500 font-semibold text-sm">Manage roles and permissions</p>
                </div>
                <div className="flex items-center space-x-3 bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200">
                    <UserCog size={20} className="text-primary" />
                    <span className="font-bold text-primary text-sm">Total Members: {users.length}</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or department..." 
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/10 border-b border-slate-100">
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Department</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Current Role</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-black">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-700">{u.name}</div>
                                                <div className="text-xs text-slate-400 font-bold">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-500 border border-slate-200">
                                            {u.department}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-2">
                                            {u.role === 'ADMIN' ? <ShieldAlert size={16} className="text-red-500" /> : <User size={16} className="text-green-500" />}
                                            <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md ${
                                                u.role === 'ADMIN' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <select 
                                              className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-600 outline-none focus:ring-2 focus:ring-primary appearance-none transition-all cursor-pointer hover:bg-slate-200"
                                              value={u.role}
                                              onChange={(e) => updateRole(u._id, e.target.value)}
                                            >
                                                <option value="STUDENT">Student</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                            <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                <XCircle size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
