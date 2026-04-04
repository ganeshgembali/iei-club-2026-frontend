import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, AlertCircle, Loader2, Star } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        // Fallback
        setEvent({
          id,
          title: 'National Level Technical Symposium',
          date: '2026-05-15',
          time: '10:00 AM - 4:00 PM',
          venue: 'Main Auditorium, Engineering Block',
          description: 'The National Level Technical Symposium is our flagship annual event. It brings together the brightest minds from across the country to compete in various technical challenges, present research papers, and attend keynote sessions by industry leaders.',
          category: 'Symposium',
          capacity: 200,
          registeredCount: 145,
          highlights: ['Robotics Competition', 'Paper Presentation', 'Coding Hackathon', 'Guest Lecture from IEI Fellow']
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegisterClick = () => {
    if (!user) {
      toast.error('Please login to register');
      navigate('/login', { state: { from: { pathname: `/events/${id}` } } });
      return;
    }
    const registrationUrl = event.registrationLink || 'https://share.google/lXNL2fJt8RXl3hODa';
    window.open(registrationUrl, '_blank');
  };

  const handleRate = async (score) => {
    if (!user) return toast.error('Please login to rate this event');
    setRatingLoading(true);
    try {
      const response = await api.post(`/events/${id}/rate`, { score });
      toast.success(response.data.message);
      setEvent({ ...event, ratings: response.data.ratings });
    } catch (error) {
      console.error('Rating error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setRatingLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (!event.ratings || event.ratings.length === 0) return 0;
    const sum = event.ratings.reduce((acc, curr) => acc + curr.score, 0);
    return (sum / event.ratings.length).toFixed(1);
  };

  const getMyRating = () => {
    if (!user || !event.ratings) return 0;
    const userId = user._id || user.id;
    const myRating = event.ratings.find(r => {
      const rUserId = r.user?._id || r.user; // Handle populated and non-populated
      return rUserId.toString() === userId.toString();
    });
    return myRating ? myRating.score : 0;
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  if (!event) return <div className="text-center py-20">Event not found</div>;

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-primary mb-8 font-semibold transition-colors">
        <ArrowLeft size={18} className="mr-2" />
        Back to Events
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
            {event.image && (
              <div className="w-full h-80 -mt-10 -mx-10 mb-8 relative">
                 <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
              </div>
            )}
            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6 inline-block">
              {event.category}
            </span>
            <h1 className="text-4xl font-extrabold text-primary mb-4 leading-tight">{event.title}</h1>
            
            <div className="flex items-center space-x-2 mb-8 bg-amber-50 w-fit px-4 py-2 rounded-2xl border border-amber-100">
               <div className="flex items-center space-x-1">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button 
                     key={star} 
                     onClick={() => handleRate(star)}
                     disabled={ratingLoading}
                     className={`focus:outline-none hover:scale-110 overflow-hidden transition-all ${ratingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                   >
                     <Star 
                       size={20} 
                       className={`transition-colors ${star <= (getMyRating() || Math.round(Number(calculateAverageRating()))) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                     />
                   </button>
                 ))}
               </div>
               <span className="text-amber-800 font-black text-sm">{calculateAverageRating()} <span className="opacity-50 text-xs uppercase tracking-tighter">({event.ratings?.length || 0} reviews)</span></span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="bg-slate-50 p-2.5 rounded-xl text-primary"><Calendar size={20} /></div>
                <div>
                   <div className="text-xs font-bold text-slate-400 uppercase">Date</div>
                   <div className="font-semibold">{new Date(event.date).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="bg-slate-50 p-2.5 rounded-xl text-primary"><Clock size={20} /></div>
                <div>
                   <div className="text-xs font-bold text-slate-400 uppercase">Time</div>
                   <div className="font-semibold">{event.time || '10:00 AM onwards'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="bg-slate-50 p-2.5 rounded-xl text-primary"><MapPin size={20} /></div>
                <div>
                   <div className="text-xs font-bold text-slate-400 uppercase">Venue</div>
                   <div className="font-semibold">{event.venue}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="bg-slate-50 p-2.5 rounded-xl text-primary"><Users size={20} /></div>
                <div>
                   <div className="text-xs font-bold text-slate-400 uppercase">Availability</div>
                   <div className="font-semibold">{event.capacity - (event.registeredCount || 0)} spots left</div>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-xl font-bold mb-4">Event Description</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Key Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(event.highlights || ['Workshop session', 'Certificate of participation', 'Networking lunch', 'Resource materials']).map((h, i) => (
                <div key={i} className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl">
                  <CheckCircle size={18} className="text-green-500 shrink-0" />
                  <span className="text-slate-700 font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary text-white p-8 rounded-3xl shadow-xl sticky top-8">
            <h3 className="text-2xl font-bold mb-4">Registration</h3>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              Secure your spot for this event. Limited seats available on a first-come, first-served basis.
            </p>
            
            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-sm py-2 border-b border-white/20">
                 <span>Registration Fee</span>
                 <span className="font-bold">Free for IEI Members</span>
               </div>
               <div className="flex justify-between text-sm py-2 border-b border-white/20">
                 <span>Deadline</span>
                 <span className="font-bold">2 days before event</span>
               </div>
            </div>

            <button
               onClick={handleRegisterClick}
               disabled={registering}
               className="w-full bg-white text-primary py-4 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:bg-slate-200"
            >
              {registering ? <Loader2 className="animate-spin" size={20} /> : 'Register Now'}
            </button>
            
            {!user && (
              <p className="text-center text-xs mt-4 text-white/60 font-medium">
                Login required for registration
              </p>
            )}
          </div>

          <div className="bg-slate-100 p-6 rounded-3xl">
             <h4 className="font-bold text-primary mb-3 flex items-center">
               <AlertCircle size={16} className="mr-2" />
               Cancellation Policy
             </h4>
             <p className="text-xs text-slate-500 leading-relaxed">
               Please inform us if you cannot attend. This allows students on the waiting list to participate. Multiple no-shows may affect future registrations.
             </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EventDetails;
