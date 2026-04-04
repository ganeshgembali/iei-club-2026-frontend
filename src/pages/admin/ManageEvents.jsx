import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit, Trash2, Search, ExternalLink, Filter, Loader2, X } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({
        title: '',
        date: '',
        venue: '',
        category: 'WORKSHOP',
        description: '',
        capacity: 100,
        image: '',
        registrationLink: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get(`/events?_t=${Date.now()}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentEvent({...currentEvent, image: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (currentEvent._id) {
                console.log(`Submitting PUT to event ${currentEvent._id}`);
                await api.put(`/events/${currentEvent._id}`, currentEvent);
                toast.success('Event updated successfully');
            } else {
                console.log(`Submitting POST to events`);
                await api.post('/events', currentEvent);
                toast.success('Event created successfully');
            }
            setShowModal(false);
            fetchEvents();
        } catch (error) {
            console.error('Submit error:', error);
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                console.log(`Submitting DELETE to event ${id}`);
                await api.delete(`/events/${id}`);
                setEvents(events.filter(e => e._id !== id));
                toast.success('Event deleted');
            } catch (error) {
                console.error('Delete error:', error);
                toast.error(error.response?.data?.message || 'Deletion failed');
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100 gap-4">
                <div>
                   <h1 className="text-3xl font-black text-primary">Manage Events</h1>
                   <p className="text-slate-500 font-semibold text-sm">Create and organize chapter events</p>
                </div>
                <button 
                  onClick={() => { setCurrentEvent({ title: '', date: '', venue: '', category: 'WORKSHOP', description: '', capacity: 100, image: '', registrationLink: '' }); setShowModal(true); }}
                  className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center shadow-xl shadow-primary/20 hover:bg-primary-light transition-all"
                >
                    <Plus size={20} className="mr-2" />
                    New Event
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center bg-slate-50/50">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by event title..." 
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Event Name</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Date & Venue</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Regs</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {events.map((event) => (
                                <tr key={event._id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-black text-slate-700">{event.title}</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mt-1">ID: {event._id}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold text-slate-600 flex items-center">
                                            <Calendar size={14} className="mr-2 text-primary" />
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1 font-semibold">{event.venue}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                            <span className="text-sm font-black text-primary">{event.registrations || 0}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-black">Registered</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase border ${
                                            event.status === 'OPEN' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-2 transition-opacity">
                                            <button 
                                              onClick={() => { setCurrentEvent(event); setShowModal(true); }}
                                              className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                              onClick={() => handleDelete(event._id)}
                                              className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-primary-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                        <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-2xl font-black text-primary">
                                {currentEvent._id ? 'Edit Event' : 'Create New Event'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 transition-colors p-2">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-10 space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Event Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700"
                                        value={currentEvent.title}
                                        onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700"
                                        value={currentEvent.date}
                                        onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Venue</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700"
                                        value={currentEvent.venue}
                                        onChange={(e) => setCurrentEvent({...currentEvent, venue: e.target.value})}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Event Description</label>
                                    <textarea 
                                        rows="4" 
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-semibold text-slate-600"
                                        value={currentEvent.description}
                                        onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Registration Redirect Link (Optional)</label>
                                    <input 
                                        type="url" 
                                        placeholder="https://..."
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700"
                                        value={currentEvent.registrationLink || ''}
                                        onChange={(e) => setCurrentEvent({...currentEvent, registrationLink: e.target.value})}
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1 ml-1 font-bold">If not provided, VIT-AP registration portal will be used by default.</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Event Banner Photo</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-slate-700"
                                        onChange={handleImageUpload}
                                    />
                                    {currentEvent.image && (
                                       <img src={currentEvent.image} alt="Preview" className="mx-auto h-32 rounded-xl object-cover shadow-sm mt-4" />
                                    )}
                                </div>
                             </div>
                             <div className="pt-4">
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-primary text-white py-5 rounded-[22px] font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <><Loader2 className="animate-spin mr-2" size={24} /> Processing...</>
                                    ) : (
                                        currentEvent._id ? 'Update Information' : 'Publish Event'
                                    )}
                                </button>
                             </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
