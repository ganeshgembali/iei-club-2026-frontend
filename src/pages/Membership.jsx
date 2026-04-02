 import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, ShieldCheck, Mail, User, BookOpen, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const Membership = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    membershipType: 'STUDENT',
    collegeId: '',
    address: '',
    phone: '',
    declaration: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      toast.error('Please accept the declaration');
      return;
    }
    setLoading(true);
    try {
      await api.post('/memberships', formData);
      setSubmitted(true);
      toast.success('Membership application submitted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-extrabold text-primary mb-4">Application Received!</h1>
        <p className="text-slate-600 mb-10 text-lg">
          Your IEI membership application has been submitted and is currently under review by the committee. You'll be notified via email once it's processed.
        </p>
        <button onClick={() => setSubmitted(false)} className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary-light transition-all">
          View Status in Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="bg-primary rounded-[40px] p-12 text-white mb-12 shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        <h1 className="text-4xl font-black mb-4 text-white drop-shadow-sm">IEI Membership Application</h1>
        <p className="text-white font-bold text-lg max-w-xl drop-shadow-sm">
          Join the prestigious network of engineers and unlock exclusive academic and professional resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                 <label className="block text-sm font-bold text-slate-700 mb-3">Full Name (As per records)</label>
                 <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 italic">
                    <User size={18} />
                    <span>{user?.name}</span>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-3">College ID / Enrollment No.</label>
                 <input 
                   type="text" 
                   required
                   className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                   placeholder="e.g. CS21004"
                   value={formData.collegeId}
                   onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
                 />
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-3">Phone Number</label>
                 <input 
                   type="tel" 
                   required
                   className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                   placeholder="+91 XXXXX XXXXX"
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                 />
               </div>

               <div className="md:col-span-2">
                 <label className="block text-sm font-bold text-slate-700 mb-3">Mailing Address</label>
                 <textarea 
                   rows="3"
                   required
                   className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                   placeholder="House No, Street, City, State, ZIP"
                   value={formData.address}
                   onChange={(e) => setFormData({...formData, address: e.target.value})}
                 ></textarea>
               </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
               <label className="flex items-start space-x-4 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="mt-1.5 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                    checked={formData.declaration}
                    onChange={(e) => setFormData({...formData, declaration: e.target.checked})}
                  />
                  <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                    I hereby declare that the information provided is true to the best of my knowledge and I agree to abide by the rules and regulations of the Institution of Engineers (India).
                  </span>
               </label>
            </div>

            <button
               type="submit"
               disabled={loading}
               className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><span>Submit Application</span><ShieldCheck size={24} /></>}
            </button>
          </form>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                 <FileText size={20} className="mr-2" />
                 Requirements
              </h3>
              <ul className="space-y-4">
                 {[
                   'Passport size photograph',
                   'Valid College ID Card',
                   'Branch Recommendation',
                   'Payment of One-time Fee'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center text-sm font-bold text-slate-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {item}
                   </li>
                 ))}
              </ul>
           </div>

           <div className="bg-amber-50 p-8 rounded-[32px] border border-amber-100">
              <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center">
                 <AlertCircle size={18} className="mr-2 text-amber-600" />
                 Note
              </h3>
              <p className="text-xs text-amber-700 leading-relaxed font-semibold">
                Student Chapter membership is valid for the entire duration of the degree course. Ensure your contact details are accurate for future certifications.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
