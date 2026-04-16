import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CreditCard, ShieldCheck, ArrowRight, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';
import API_BASE from '../utils/api';

export default function Donate() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [type, setType] = useState('one-time');
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getFinalAmount = () => {
    if (amount === 'custom') {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? null : parsed;
    }
    return amount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const finalAmount = getFinalAmount();
    if (!finalAmount) {
      setErrorMsg('Please enter a valid donation amount.');
      setStatus('error');
      return;
    }
    if (!form.first_name || !form.last_name || !form.email || !form.phone) {
      setErrorMsg('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/donations`, {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        amount: finalAmount,
        type,
        message: form.message,
      });

      setStatus('success');
    } catch (err) {
      console.error(err);
      let errMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        'Failed to process donation. Is the server running?';

      if (err?.response?.status === 404 && String(err?.config?.url || '').startsWith('/api/')) {
        errMsg =
          'Donation API not found (404). If you deployed only the frontend, deploy the backend and set `VITE_API_URL` (or `VITE_API_BASE_URL`) to your backend URL.';
      }

      if (typeof errMsg !== 'string') errMsg = String(errMsg);
      setErrorMsg(errMsg);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === 'success') {
    return (
      <div className="pt-28 pb-20 lg:pt-40 lg:pb-28 bg-transparent min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/40 rounded-3xl p-10 shadow-xl border border-white text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-green-100/80 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-brand-blue mb-3">Complete Your Payment</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Please complete your donation of <strong className="text-brand-orange">₹{getFinalAmount()}</strong> by scanning the QR code below.
          </p>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 inline-flex flex-col items-center mb-6">
            <img src="/qr-code.png" alt="Payment QR Code" className="w-48 h-48 sm:w-56 sm:h-56 object-contain" />
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl text-left text-sm text-gray-700 mb-8 border border-blue-100">
            <h4 className="font-bold text-brand-blue mb-2 flex items-center gap-2"><Heart className="w-4 h-4" /> How to Donate</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Open your preferred payment app (GPay, PhonePe, Paytm, etc.).</li>
              <li>Scan the QR code shown above.</li>
              <li>Pay the selected amount: <strong>₹{getFinalAmount()}</strong>.</li>
              <li>Complete the payment securely on your device.</li>
            </ol>
            <div className="mt-3 bg-white p-3 rounded-lg border border-orange-100 border-l-4 border-l-brand-orange">
              <p className="text-gray-600 text-xs sm:text-sm font-medium">
                You will receive your official donation receipt on your number <strong className="text-brand-orange">{form.phone}</strong> shortly after we verify the payment.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setStatus('idle');
              setForm({ first_name: '', last_name: '', email: '', phone: '', message: '' });
              setAmount(50);
            }}
            className="px-6 py-3 bg-gradient-to-r from-brand-blue to-blue-800 text-white rounded-xl font-bold hover:shadow-lg transition-all w-full"
          >
            I have completed the payment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 lg:pt-40 lg:pb-28 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-brand-orange text-sm font-bold tracking-wide mb-6">
            <Heart className="w-4 h-4" /> Support Our Cause
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-brand-blue mb-6 leading-tight">
            Your Contribution <br className="hidden sm:block" />Creates <span className="text-brand-orange">Lasting Impact.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Every donation helps us provide essential education, health services, and career opportunities to those who need it most. Together, we can build a stronger, self-sustaining community.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>

            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-brand-lightBlue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Secure & Transparent</h4>
                <p className="text-gray-600 text-sm">Every contribution is recorded and accounted for with full transparency.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white"
        >
          <h3 className="text-2xl font-heading font-bold text-brand-blue mb-6">Choose Donation Level</h3>

          {/* Donation Type Toggle */}


          <form onSubmit={handleSubmit}>
            {/* Amount Options */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 mb-6">
              {[25, 50, 100, 250, 500].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`py-3 rounded-xl border-2 font-bold text-sm sm:text-base transition-all ${amount === amt ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  ₹{amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount('custom')}
                className={`py-3 rounded-xl border-2 font-bold text-sm sm:text-base transition-all ${amount === 'custom' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Custom
              </button>
            </div>

            {/* Custom Amount Input */}
            <AnimatePresence>
              {amount === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 relative overflow-hidden"
                >
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-200 pl-8 pr-4 min-h-[56px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors font-bold text-lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Donor Info Fields */}
            <div className="space-y-4 mb-6 border-t border-gray-100 pt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name *"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors"
                />
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name *"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors"
                />
              </div>
              <textarea
                name="message"
                placeholder="Leave a message (optional)"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors resize-none"
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {String(errorMsg)}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full min-h-[56px] bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Donate {amount !== 'custom' ? `₹${amount}` : customAmount ? `₹${customAmount}` : ''} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
