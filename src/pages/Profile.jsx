import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, Hash, Shield, Save, Loader2 } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        department: user?.department || '',
        rollNumber: user?.rollNumber || '',
    });
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/users/me', formData);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="flex items-center space-x-6 mb-10 pb-6 border-b border-slate-100">
                   <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center font-black text-3xl">
                      {user?.name?.charAt(0)}
                   </div>
                   <div>
                      <h1 className="text-2xl font-black text-primary">{user?.name}</h1>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest tracking-tighter">Student Profile</p>
                   </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">University Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="email" 
                                    disabled
                                    className="w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-200 rounded-2xl cursor-not-allowed font-bold text-slate-400" 
                                    value={formData.email}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Department</label>
                            <div className="relative">
                                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <select 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700 appearance-none" 
                                    value={formData.department}
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                >
                                    <option value="CSE">Computer Science</option>
                                    <option value="ECE">Electronics</option>
                                    <option value="ME">Mechanical</option>
                                    <option value="CE">Civil</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Roll / Enrollment</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700" 
                                    value={formData.rollNumber}
                                    onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-primary text-white py-5 rounded-[22px] font-black shadow-2xl shadow-primary/30 hover:bg-primary-light transition-all flex items-center justify-center space-x-3"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /><span>Save Profile Changes</span></>}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-700">Account Security</h4>
                        <p className="text-xs text-slate-500">Manage your password and active sessions.</p>
                    </div>
                </div>
                <button className="text-primary font-bold text-sm hover:underline">Update Security</button>
            </div>
        </div>
    );
};

export default Profile;
