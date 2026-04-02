import React from 'react';
import { MessageSquare, Star, User, Calendar, Loader2 } from 'lucide-react';

const FeedbackViewer = () => {
    // Mock data for feedback
    const feedbacks = [
        { id: '1', user: 'Rahul Sharma', event: 'AI Workshop', rating: 5, comment: 'Excellent session, very informative.', date: '2026-03-26' },
        { id: '2', user: 'Anita Paul', event: 'AI Workshop', rating: 4, comment: 'Good hands-on part. Required more time.', date: '2026-03-26' },
        { id: '3', user: 'Siddharth M.', event: 'Python for Engineers', rating: 5, comment: 'Loved the practical approach.', date: '2026-04-12' },
    ];

    return (
        <div className="space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                   <h1 className="text-3xl font-black text-primary">Event Feedback</h1>
                   <p className="text-slate-500 font-bold text-sm">Review student testimonials and ratings</p>
                </div>
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center font-black text-slate-400 text-xs">
                        {String.fromCharCode(64 + i)}
                     </div>
                   ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacks.map((f) => (
                    <div key={f.id} className="bg-white p-8 rounded-[32px] shadow-md border border-slate-100 hover:shadow-xl transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-1 text-amber-400">
                                {[...Array(f.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <div className="text-[10px] font-black text-slate-300 uppercase">{f.date}</div>
                        </div>
                        
                        <p className="text-slate-600 font-medium italic mb-8 leading-relaxed">
                            "{f.comment}"
                        </p>

                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center font-black text-[10px]">
                                    {f.user.charAt(0)}
                                </div>
                                <div className="text-xs font-black text-slate-700">{f.user}</div>
                            </div>
                            <div className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded-md uppercase tracking-tighter">
                                {f.event}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackViewer;
