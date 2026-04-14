import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_BASE from '../utils/api';
import { LogOut, Heart, MessageSquare, Loader, User, DollarSign, Mail, MapPin } from 'lucide-react';

export default function AdminDashboard() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('donations'); // 'donations' | 'messages'
  const [data, setData] = useState({ donations: [], messages: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [donationsRes, messagesRes] = await Promise.all([
          axios.get(`${API_BASE}/api/donations`),
          axios.get(`${API_BASE}/api/contact`)
        ]);
        setData({
          donations: donationsRes.data.data,
          messages: messagesRes.data.data
        });
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate('/admin/login');
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-10 h-10 animate-spin text-brand-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-extrabold text-brand-blue">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage foundation donations and inquiries</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm font-semibold"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {error && (
           <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 shadow-sm border border-red-100">
             {error}
           </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Donations</p>
              <h3 className="text-3xl font-extrabold text-brand-blue">{data.donations.length}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-brand-orange">
              <Heart className="w-6 h-6" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Messages</p>
              <h3 className="text-3xl font-extrabold text-brand-blue">{data.messages.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-lightBlue">
              <MessageSquare className="w-6 h-6" />
            </div>
          </motion.div>
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Raised</p>
              <h3 className="text-3xl font-extrabold text-brand-blue">
                ${data.donations.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 bg-gray-100/50 p-1.5 rounded-xl inline-flex w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('donations')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'donations' ? 'bg-white text-brand-blue shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
          >
            <Heart className="w-4 h-4" /> Donations
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'messages' ? 'bg-white text-brand-blue shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
          >
            <MessageSquare className="w-4 h-4" /> Messages
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'donations' && (
              <motion.div
                key="donations"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm font-semibold uppercase tracking-wider border-b border-gray-100">
                      <th className="px-6 py-4">Donor</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.donations.length === 0 ? (
                       <tr>
                         <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No donations recorded yet.</td>
                       </tr>
                    ) : (
                      data.donations.map((donation) => (
                        <tr key={donation.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{donation.first_name} {donation.last_name}</span>
                              <span className="text-sm text-gray-500">{donation.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-extrabold text-brand-orange">${donation.amount.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${donation.type === 'monthly' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                               {donation.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={donation.message}>{donation.message || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {new Date(donation.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="overflow-x-auto"
              >
                  <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm font-semibold uppercase tracking-wider border-b border-gray-100">
                      <th className="px-6 py-4">Sender</th>
                      <th className="px-6 py-4">Subject/Category</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.messages.length === 0 ? (
                       <tr>
                         <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No messages received yet.</td>
                       </tr>
                    ) : (
                      data.messages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors items-start">
                          <td className="px-6 py-4 align-top">
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{msg.name}</span>
                              <span className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3"/> {msg.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 align-top text-sm font-medium text-brand-blue">{msg.subject || '-'}</td>
                          <td className="px-6 py-4 align-top text-sm text-gray-700 min-w-[250px]">
                            <p className="line-clamp-3" title={msg.message}>{msg.message}</p>
                          </td>
                          <td className="px-6 py-4 align-top text-sm text-gray-500 whitespace-nowrap">
                            {new Date(msg.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
