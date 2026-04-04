import React, { useState, useEffect } from 'react';
import { Search, UserCheck, XCircle, Clock, CheckCircle, FileText, Loader2, Mail } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const MembershipRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await api.get('/memberships');
            // Only show PENDING requests on this management page
            setRequests(response.data.filter(r => r.status === 'PENDING'));
        } catch (error) {
            console.error('Error fetching membership requests:', error);
            toast.error('Failed to load membership requests');
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            await api.put(`/memberships/${id}`, { status: action }); // APPROVED or REJECTED
            toast.success(`Application ${action.toLowerCase()}`);
            setRequests(requests.filter(r => r._id !== id));
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                   <h1 className="text-3xl font-black text-primary">Membership Requests</h1>
                   <p className="text-slate-500 font-bold text-sm">Reviewing {requests.length} pending applications</p>
                </div>
                <div className="bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100 flex items-center space-x-3 text-amber-700">
                    <Clock size={20} />
                    <span className="font-black text-sm uppercase tracking-tighter">Action Required</span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
            ) : requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {requests.map((req) => (
                        <div key={req._id} className="bg-white rounded-[32px] p-8 shadow-md border border-slate-100 hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xl group-hover:bg-primary group-hover:text-white transition-all text-uppercase">
                                        {(req.user?.name || 'U').charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-700 text-lg">{req.user?.name || 'Unknown User'}</h3>
                                        <div className="text-xs text-slate-400 font-bold">{req.user?.email || 'No email provided'}</div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{new Date(req.createdAt).toLocaleDateString()}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">College ID</div>
                                    <div className="text-sm font-bold text-slate-700">{req.collegeId}</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Phone</div>
                                    <div className="text-sm font-bold text-slate-700">{req.phone}</div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button 
                                    onClick={() => handleAction(req._id, 'APPROVED')}
                                    className="flex-grow bg-green-50 text-green-600 py-4 rounded-2xl font-black text-sm flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
                                >
                                    <CheckCircle size={18} className="mr-2" />
                                    Approve
                                </button>
                                <button 
                                    onClick={() => handleAction(req._id, 'REJECTED')}
                                    className="flex-grow bg-red-50 text-red-600 py-4 rounded-2xl font-black text-sm flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                                >
                                    <XCircle size={18} className="mr-2" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                    <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                    <h3 className="text-xl font-bold text-slate-400">No pending requests</h3>
                </div>
            )}
        </div>
    );
};

export default MembershipRequests;
