import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-primary-light pb-2 inline-block">IEI Student Chapter</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Institution of Engineers (India) is a multi-disciplinary professional body of engineers with over 15 constituent engineering disciplines.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-light transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary-light transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary-light transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-primary-light transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="/membership" className="hover:text-white transition-colors">Membership</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Member Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Event Gallery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chapter Bylaws</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Official IEI Website</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="text-primary-light grow-0 shrink-0 mt-1" size={18} />
                <span>VIT-AP University, Inavolu, Beside AP Secretariat, Amaravati, Andhra Pradesh 522237</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-primary-light grow-0 shrink-0" size={18} />
                <span>+91 863 2370444</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-primary-light grow-0 shrink-0" size={18} />
                <span>iei.chapter@vitap.ac.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
          <p>© {new Date().getFullYear()} Institution of Engineers (India). All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
