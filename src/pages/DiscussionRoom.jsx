import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send, Video, MessageSquare, Users, Loader2, Phone, X } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const DiscussionRoom = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('CHAT'); // CHAT or VIDEO
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/discussion');
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    // Refresh messages every 5 seconds (Simple polling)
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await api.post('/discussion', { content: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-180px)] flex flex-col bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100">
      {/* Header Tabs */}
      <div className="flex bg-slate-50 border-b border-slate-100 p-2">
        <button 
          onClick={() => setActiveTab('CHAT')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold transition-all ${activeTab === 'CHAT' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
        >
          <MessageSquare size={20} />
          <span>Team Chat</span>
        </button>
        <button 
          onClick={() => setActiveTab('VIDEO')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold transition-all ${activeTab === 'VIDEO' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-white/50'}`}
        >
          <Video size={20} />
          <span>Video Meeting</span>
        </button>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Chat Area */}
        {activeTab === 'CHAT' && (
          <div className="flex-grow flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender._id === user?.id ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center space-x-2 mb-1 px-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{msg.sender.name}</span>
                    <span className="text-[10px] text-slate-300">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm text-sm font-medium ${msg.sender._id === user?.id ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex items-center space-x-2 md:space-x-4">
              <input 
                type="text" 
                placeholder="Type your message here..."
                className="flex-grow bg-white border border-slate-200 rounded-2xl px-4 py-3 md:px-6 md:py-4 focus:ring-2 focus:ring-primary outline-none transition-all shadow-inner text-sm md:text-base"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button 
                disabled={sending || !newMessage.trim()}
                className="bg-primary text-white p-3 md:p-4 rounded-2xl hover:bg-primary-light transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="md:w-6 md:h-6" />}
              </button>
            </form>
          </div>
        )}

        {/* Video Area */}
        {activeTab === 'VIDEO' && (
          <div className="flex-grow relative bg-slate-900 flex items-center justify-center">
            <iframe 
              src={`https://meet.jit.si/IEI-VITAP-DiscussionRoom-${user?.id?.substring(0, 5)}`} 
              allow="camera; microphone; fullscreen; display-capture"
              className="w-full h-full border-none"
              title="Video Meeting"
            ></iframe>
            <div className="absolute top-6 right-6 flex space-x-4">
               <div className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse">
                 Live Meeting Session
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionRoom;
