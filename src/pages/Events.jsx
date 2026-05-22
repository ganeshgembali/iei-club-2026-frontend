import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, ArrowRight } from 'lucide-react';
import api from '../services/api';

const Events = () => {
  const [events, setEvents] = useState(() => {
    try {
      const cached = localStorage.getItem('iei_events_cache');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });
  const [loading, setLoading] = useState(events.length === 0);
  const [filter, setFilter] = useState('ALL'); // ALL, UPCOMING, PAST

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
        localStorage.setItem('iei_events_cache', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching events:', error);
        if (events.length === 0) {
          setEvents([
            { id: '1', title: 'National Level Technical Symposium', date: '2026-05-15', venue: 'Main Auditorium', category: 'Symposium', description: 'Annual tech symposium featuring competitions and talks.' },
            { id: '2', title: 'Workshop on IoT Applications', date: '2026-04-20', venue: 'Lab 4', category: 'Workshop', description: 'Hands-on workshop on building IoT applications.' },
            { id: '3', title: 'Civil Engineering Career Talk', date: '2026-02-10', venue: 'Seminar Hall', category: 'Webinar', description: 'Expert talk on career prospects in civil engineering.' },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    const today = new Date();
    if (filter === 'UPCOMING') return eventDate >= today;
    if (filter === 'PAST') return eventDate < today;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 gap-4 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-extrabold text-primary">Explore Events</h1>
          <p className="text-slate-500">Discover workshops, seminars, and competitions.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {['ALL', 'UPCOMING', 'PAST'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filter === f 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event._id || event.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-2xl transition-all flex flex-col group translate-y-0 hover:-translate-y-2 duration-300">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                 {event.image ? (
                   <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 ) : (
                   <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Calendar className="text-primary/20" size={48} />
                   </div>
                 )}
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm z-10 uppercase tracking-tighter">
                   {event.category || 'Event'}
                 </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <div className="flex items-center text-slate-400 text-[10px] mb-3 font-black uppercase tracking-widest">
                  <Calendar size={12} className="mr-1.5 text-primary" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-black text-slate-700 mb-3 leading-snug group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center text-slate-500 text-xs mb-4 font-bold">
                  <MapPin size={14} className="mr-1.5 text-slate-400" />
                  <span>{event.venue}</span>
                </div>
                <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
                  {event.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={`/events/${event._id || event.id}`} 
                    className="w-full bg-primary text-white py-4 rounded-2xl font-black text-center inline-block hover:bg-primary-light shadow-xl shadow-primary/10 transition-all uppercase tracking-widest text-xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
           <Search size={48} className="mx-auto text-slate-300 mb-4" />
           <h3 className="text-xl font-bold text-slate-500">No events found</h3>
           <p className="text-slate-400">Try changing your filters or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
