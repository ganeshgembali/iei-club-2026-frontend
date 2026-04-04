import React from 'react';
import { Award, Target, BookOpen, ShieldCheck, Mail, MapPin, Users, Calendar } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Overview Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-black text-primary leading-tight">Driving Engineering Excellence</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          The Institution of Engineers (India) [IEI] is a multidisciplinary professional body that encompasses 15 engineering disciplines and represents India in several international bodies.
        </p>
      </section>

      {/* Mission/Vision Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[40px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500">
           <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:text-white text-primary transition-colors">
              <Award size={40} />
           </div>
           <h2 className="text-3xl font-black mb-6 text-primary group-hover:text-white transition-colors">Our Mission</h2>
           <p className="text-slate-600 leading-relaxed group-hover:text-white/80 transition-colors">
             To provide a professional platform for students to develop technical expertise, leadership skills, and ethical values through structured engineering education and practice.
           </p>
        </div>

        <div className="bg-white p-12 rounded-[40px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500">
           <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:text-white text-primary transition-colors">
              <Target size={40} />
           </div>
           <h2 className="text-3xl font-black mb-6 text-primary group-hover:text-white transition-colors">Our Vision</h2>
           <p className="text-slate-600 leading-relaxed group-hover:text-white/80 transition-colors">
             To be the leading student chapter in India recognized for innovation, research, and contribution to the global engineering community.
           </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-primary-dark rounded-[50px] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full -translate-x-32 -translate-y-32 blur-3xl opacity-20"></div>
        
        <div className="relative z-10 text-center mb-16">
           <h2 className="text-4xl font-black mb-4 text-white">Why Join IEI Student Chapter?</h2>
           <p className="text-primary-light font-bold uppercase tracking-[0.2em] text-sm">Member Benefits & Opportunities</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
           {[
             { title: 'Global Recognition', desc: 'Membership is recognized globally and acts as a professional credential.', icon: <ShieldCheck /> },
             { title: 'Networking', desc: 'Connect with industry experts, faculty, and engineers worldwide.', icon: <Users /> },
             { title: 'Competitions', desc: 'Access to national and regional technical symposiums and events.', icon: <Award /> },
             { title: 'Journals & Grants', desc: 'Access to IEI journals, R&D grants, and technical publications.', icon: <BookOpen /> },
             { title: 'Seminars', desc: 'Participate in professional development programs and workshops.', icon: <Calendar /> },
             { title: 'Scholarships', desc: 'Meritorious students can apply for various IEI scholarships.', icon: <FileText /> },
           ].map((feat, i) => (
             <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-lg border border-white/10">
                   {feat.icon}
                </div>
                <h4 className="text-xl font-bold text-white">{feat.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* History/About Chapter */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
         <div className="lg:col-span-3 space-y-8">
            <h2 className="text-4xl font-extrabold text-primary">About Our Branch</h2>
            <p className="text-slate-600 leading-relaxed">
               Our local student chapter was established in 2015 with the aim of promoting the art and science of engineering. We conduct weekly technical sessions, industrial visits, and guest lectures to bridge the gap between academia and industry.
            </p>
            <div className="space-y-4">
               <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <MapPin className="text-primary" />
                  <span className="font-bold text-slate-700">VIT-AP University, Admin Block 2</span>
               </div>
               <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <Mail className="text-primary" />
                  <span className="font-bold text-slate-700">iei.chapter@vitap.ac.in</span>
               </div>
            </div>
         </div>
         <div className="lg:col-span-2 hidden lg:block">
            <div className="relative">
               <div className="w-full aspect-square bg-slate-200 rounded-[60px] transform rotate-6 absolute inset-0 -z-10 bg-gradient-to-br from-primary to-primary-light"></div>
               <div className="w-full aspect-square bg-white rounded-[60px] shadow-2xl flex items-center justify-center p-12 border border-slate-100">
                  <div className="w-full h-full bg-white rounded-[40px] flex items-center justify-center p-6 overflow-hidden">
                     <img src="/logo.png" alt="IEI Logo" className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" />
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

// Internal icon proxy for easy copy-paste
const FileText = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;

export default About;
