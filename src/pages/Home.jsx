import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Bell, Users, Award } from 'lucide-react';
import api from '../services/api';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchHomeEvents = async () => {
      try {
        const response = await api.get('/events');
        // Get up to 2 future events
        const future = response.data.filter(e => new Date(e.date) >= new Date());
        setUpcomingEvents(future.slice(0, 2));
      } catch (error) {
        console.error('Failed to fetch home events');
      }
    };
    fetchHomeEvents();
  }, []);
  return (
    <div className="space-y-16 pb-12 animate-in slide-in-from-bottom-8 duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-slate-100 group">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 flex items-center justify-center opacity-40 transition-transform duration-1000 group-hover:scale-110">
           <div className="w-64 h-64 border-8 border-primary rounded-full absolute -top-10 -right-10 animate-[spin_20s_linear_infinite]"></div>
           <div className="w-32 h-32 border-4 border-primary-light rounded-full absolute bottom-10 right-20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 animate-bounce">
            Empowering Future Engineers
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight mb-6 transition-all hover:text-primary-dark cursor-default">
            Institution of Engineers (India)
            <span className="block text-primary-light">Student Chapter</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Joining the IEI Student Chapter provides students with various opportunities to enhance their technical skills, network with professionals, and participate in national-level engineering competitions.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/events" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-light hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/40 flex items-center justify-center space-x-2 group/btn">
              <span>View Events</span>
              <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
            </Link>
            <Link to="/membership" className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center">
              Join Membership
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Members', value: '500+', icon: <Users className="text-primary group-hover:animate-bounce" /> },
          { label: 'Annual Events', value: '25+', icon: <Calendar className="text-primary group-hover:animate-pulse" /> },
          { label: 'Collaborations', value: '10+', icon: <Award className="text-primary group-hover:rotate-12 transition-transform" /> },
          { label: 'Chapters', value: '100+', icon: <Bell className="text-primary group-hover:scale-110 transition-transform" /> },
        ].map((stat, i) => (
          <div key={i} style={{ animationDelay: `${i * 100}ms` }} className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl border border-slate-100 flex items-center space-x-4 cursor-pointer hover:-translate-y-2 transition-all duration-300 group animate-in zoom-in fill-mode-both">
            <div className="bg-primary/5 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">{stat.icon}</div>
            <div>
              <div className="text-3xl font-black text-primary group-hover:scale-105 transition-transform origin-left">{stat.value}</div>
              <div className="text-slate-500 text-sm font-semibold">{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Upcoming Events & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Events Preview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-primary">Upcoming Events</h2>
              <p className="text-slate-500 mt-2">Don't miss out on our upcoming technical sessions and workshops.</p>
            </div>
            <Link to="/events" className="text-primary font-semibold flex items-center hover:underline decoration-2 underline-offset-4">
              Explore All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event._id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow group">
                  <div className="h-48 bg-slate-200 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 text-white">
                        <span className="px-2 py-1 bg-primary text-xs rounded mb-2 inline-block">{event.category || 'Event'}</span>
                        <h4 className="font-bold text-lg">{event.title}</h4>
                     </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-slate-500 text-sm mb-4">
                      <Calendar size={16} className="mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{event.venue}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                      {event.description}
                    </p>
                    <Link to={`/events/${event._id}`} className="text-primary font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
               <div className="col-span-2 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-slate-500">No upcoming events right now. Check back soon!</p>
               </div>
            )}
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-primary text-center">Announcements</h2>
            <p className="text-slate-500 text-sm mt-2">Latest updates from the chapter.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            {[
              { title: 'IEI National Convention 2026', date: 'March 10' },
              { title: 'Membership Drive Extension', date: 'March 05' },
              { title: 'New Committee Members Announced', date: 'Feb 28' },
              { title: 'Research Grant Applications Open', date: 'Feb 20' },
            ].map((item, i, arr) => (
              <div key={i} className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${i !== arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="text-xs text-slate-400 mb-1">{item.date}</div>
                <h4 className="font-semibold text-primary text-sm">{item.title}</h4>
              </div>
            ))}
            <div className="bg-slate-50 p-4 text-center">
               <button className="text-primary text-sm font-bold hover:underline">View All Notifications</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
