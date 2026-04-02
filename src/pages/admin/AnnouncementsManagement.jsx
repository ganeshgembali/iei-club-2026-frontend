import React, { useState } from 'react';
import { Bell, Plus, Trash2, Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AnnouncementsManagement = () => {
    const [announcements, setAnnouncements] = useState([
        { id: '1', title: 'National Convention 2026 Registration Open', date: '2026-03-20', priority: 'HIGH' },
        { id: '2', title: 'New Semester Membership Drive', date: '2026-03-15', priority: 'NORMAL' },
    ]);
    const [newText, setNewText] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePublish = () => {
        if (!newText) return;
        setLoading(true);
        setTimeout(() => {
            setAnnouncements([{ id: Date.now().toString(), title: newText, date: new Date().toISOString().split('T')[0], priority: 'NORMAL' }, ...announcements]);
            setNewText('');
            setLoading(false);
            toast.success('Announcement published!');
        }, 800);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
               <h1 className="text-3xl font-black text-primary mb-2">Broadcast Announcements</h1>
               <p className="text-slate-500 font-bold text-sm">Notify all members about updates and news</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100">
                        <h3 className="text-xl font-bold text-primary mb-6">New Broadcast</h3>
                        <textarea 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none min-h-[150px] font-semibold text-slate-700"
                            placeholder="Type your message here..."
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        ></textarea>
                        <button 
                            onClick={handlePublish}
                            disabled={loading || !newText}
                            className="w-full bg-primary text-white py-4 mt-4 rounded-xl font-black flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /><span>Publish Now</span></>}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[32px] shadow-md border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-primary">Active Announcements</h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {announcements.map((item) => (
                                <div key={item.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start space-x-4">
                                        <div className={`mt-1 p-2 rounded-lg ${item.priority === 'HIGH' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                            <Bell size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-700 leading-snug">{item.title}</h4>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{item.date}</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setAnnouncements(announcements.filter(a => a.id !== item.id))}
                                        className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementsManagement;
