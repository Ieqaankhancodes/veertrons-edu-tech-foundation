import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Donate() {
  const [amount, setAmount] = useState(50);
  const [type, setType] = useState('one-time');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 lg:pt-40 lg:pb-28 bg-brand-light min-h-screen">
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
            Your Contribution <br className="hidden sm:block"/> Creates <span className="text-brand-orange">Lasting Impact.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Every donation helps us provide essential education, health services, and career opportunities to those who need it most. Together, we can build a stronger, self-sustaining community.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Tax Deductible</h4>
                <p className="text-gray-600 text-sm">All donations are 100% tax-deductible under applicable laws.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-brand-lightBlue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Secure Payment</h4>
                <p className="text-gray-600 text-sm">Processed via enterprise-grade encryption for your security.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100"
        >
          <h3 className="text-2xl font-heading font-bold text-brand-blue mb-6">Choose Donation Level</h3>
          
          {/* Donation Type Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setType('one-time')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${type === 'one-time' ? 'bg-white shadow-md text-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}
            >
              One Time
            </button>
            <button 
              onClick={() => setType('monthly')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${type === 'monthly' ? 'bg-white shadow-md text-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
          </div>

          {/* Amount Options */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 mb-6">
            {[25, 50, 100, 250, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`py-3 rounded-xl border-2 font-bold text-sm sm:text-base transition-all ${amount === amt ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                ${amt}
              </button>
            ))}
            <button
              onClick={() => setAmount('custom')}
              className={`py-3 rounded-xl border-2 font-bold text-sm sm:text-base transition-all ${amount === 'custom' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              Custom
            </button>
          </div>

          {/* Custom Amount Input */}
          {amount === 'custom' && (
            <div className="mb-6 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full bg-gray-50 border border-gray-200 pl-8 pr-4 min-h-[56px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors font-bold text-lg"
              />
            </div>
          )}

          <div className="space-y-4 mb-8 border-t border-gray-100 pt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
              <input type="text" placeholder="Last Name" className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
          </div>

          <button className="w-full min-h-[56px] bg-brand-blue hover:bg-blue-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg">
            Donate {amount !== 'custom' ? `$${amount}` : ''} <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
