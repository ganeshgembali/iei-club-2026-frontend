import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, ArrowRight } from 'lucide-react';
import api from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, UPCOMING, PAST

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback dummy data if API fails
        setEvents([
          { id: '1', title: 'National Level Technical Symposium', date: '2026-05-15', venue: 'Main Auditorium', category: 'Symposium', description: 'Annual tech symposium featuring competitions and talks.' },
          { id: '2', title: 'Workshop on IoT Applications', date: '2026-04-20', venue: 'Lab 4', category: 'Workshop', description: 'Hands-on workshop on building IoT applications.' },
          { id: '3', title: 'Civil Engineering Career Talk', date: '2026-02-10', venue: 'Seminar Hall', category: 'Webinar', description: 'Expert talk on career prospects in civil engineering.' },
        ]);
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
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-primary">Explore Events</h1>
          <p className="text-slate-500">Discover workshops, seminars, and competitions.</p>
        </div>
        
        <div className="flex space-x-2">
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
            <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-2xl transition-all flex flex-col group translate-y-0 hover:-translate-y-2 duration-300">
              <div className="h-40 bg-slate-100 relative">
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                   {event.category || 'Event'}
                 </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center text-slate-400 text-xs mb-3 font-semibold uppercase tracking-wider">
                  <Calendar size={14} className="mr-1.5" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 leading-snug group-hover:text-primary-light transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin size={14} className="mr-1.5" />
                  <span>{event.venue}</span>
                </div>
                <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={`/events/${event._id || event.id}`} 
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold text-center inline-block hover:bg-primary-light shadow-md hover:shadow-primary/30 transition-all"
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
