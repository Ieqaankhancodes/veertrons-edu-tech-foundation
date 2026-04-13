import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Heart,
  Baby,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  HeartHandshake,
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PROGRAMS = [
  {
    category: 'Education & Career',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
    icon: GraduationCap,
    desc: 'Empowering youth with skills, guidance, and direct industry connections.',
    items: [
      'Skill Training & Placement',
      'Career Guidance (10th & 12th)',
      'Professional Internships',
      'Bi-Annual Job Fairs',
    ],
  },
  {
    category: 'Social Impact & Health',
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
    icon: Heart,
    desc: 'Uplifting women and ensuring strong, healthy communities across the region.',
    items: [
      'Women Empowerment',
      'Community Health Camps',
      'Localized Social Development',
    ],
  },
  {
    category: 'Early Childhood Care',
    img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    icon: Baby,
    desc: 'Providing a safe, nurturing foundation for the youngest minds to grow.',
    items: [
      'Play School',
      'Kindergarten Essentials',
    ],
  },
];

function Hero() {
  return (
    <section className="relative pt-24 lg:pt-36 pb-20 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-orange-50/50">
      {/* Soft Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-lightBlue/10 blur-3xl opacity-60"></div>
        <div className="absolute top-[40%] -left-[20%] w-[50%] h-[50%] rounded-full bg-brand-orange/5 blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left lg:pr-10 pt-10"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-brand-orange rounded-full"></span>
              <span className="text-sm font-sans font-bold text-gray-600 tracking-[0.25em] uppercase drop-shadow-sm">
                Veertrons Edu-Tech Foundation
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-sans font-extrabold text-brand-blue leading-[1.1] mb-6 tracking-tight">
              Empowering India's Youth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">Skills for Tomorrow.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed font-medium max-w-lg">
              We provide comprehensive 360° support—from early childhood education to technical training and corporate placements—building a resilient ecosystem for lifelong success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/donate"
                className="flex items-center justify-center min-w-[180px] min-h-[56px] bg-brand-orange text-white px-8 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 gap-2"
              >
                Donate Now <Heart className="w-4 h-4" />
              </Link>
              <a
                href="#programs"
                className="flex items-center justify-center min-w-[180px] min-h-[56px] bg-white text-brand-blue border-2 border-brand-lightBlue/20 px-8 rounded-full font-bold text-base hover:bg-brand-blue/5 hover:border-brand-lightBlue transition-all"
              >
                Explore Programs
              </a>
            </div>
            

          </motion.div>

          {/* Right Image/Graphic Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Arch Image */}
            <div className="relative w-[85%] sm:w-[70%] lg:w-[85%] aspect-[3/4] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-8 border-white bg-white z-10">
              <img
                src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=800&q=80"
                alt="Students learning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Element 1 - Top Right */}
            <div className="absolute top-[10%] -right-4 sm:right-0 lg:-right-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white z-20 animate-bounce-slow max-w-[240px]">
              <div className="text-brand-orange text-2xl leading-none absolute -top-2 -left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">"</div>
              <p className="text-sm font-heading font-semibold text-brand-blue italic leading-relaxed relative z-10 pt-2">
                Education is the passport to the future, for tomorrow belongs to those who prepare for it today.
              </p>
            </div>

            {/* Floating Element 2 - Bottom Left */}
            <div className="absolute bottom-[10%] -left-4 sm:-left-6 lg:-left-16 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white z-20 max-w-[220px]">
               <div className="text-brand-orange text-2xl leading-none absolute -top-2 -left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">"</div>
               <p className="text-sm font-heading font-semibold text-brand-blue italic leading-relaxed relative z-10 pt-2">
                 Empowering every mind to dream bigger and reach higher.
               </p>
            </div>
            
            {/* Background Accent shapes */}
            <div className="absolute -z-10 bottom-0 right-[10%] w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="mission" className="py-20 lg:py-28 bg-brand-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 lg:px-8 text-center flex flex-col items-center relative z-10"
      >
        <HeartHandshake className="w-16 h-16 text-brand-orange mb-6 drop-shadow-lg" />
        <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-white mb-8">Our Vision & Mission</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-blue-50 leading-relaxed max-w-3xl font-medium italic drop-shadow-sm">
          "At Veertrons Foundation, we do not view growth in isolation. We believe in complete, holistic development. By providing a strong base in early childhood, guiding students through pivotal exams, offering technical internships, and supporting women's health—we are building a self-sustaining ecosystem for lifelong success."
        </p>
        <div className="mt-10 h-1 sm:h-1.5 w-24 bg-brand-orange rounded-full shadow-lg"></div>
      </motion.div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="py-20 lg:py-28 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-brand-blue mb-4">Core Focus Areas</h2>
          <p className="text-gray-600 text-lg">Structured into three distinct pillars to provide targeted, meaningful impact across all segments of our society.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program, idx) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-100 flex flex-col group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={program.img}
                    alt={program.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-brand-blue/0 transition-colors duration-300"></div>
                  
                  <div className="absolute -bottom-8 left-8 w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-50 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-brand-orange" />
                  </div>
                </div>

                <div className="pt-14 pb-8 px-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-heading font-semibold text-brand-blue mb-3">{program.category}</h3>
                  <p className="text-gray-600 mb-6 text-sm flex-1">{program.desc}</p>
                  
                  <div className="space-y-3 bg-gray-50 p-5 rounded-2xl">
                    {program.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-brand-lightBlue shrink-0" />
                        <span className="text-sm font-semibold text-gray-700 leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GetInvolved() {
  return (
    <section id="get-involved" className="py-20 lg:py-28 bg-brand-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-white mb-4">You Can Make a Difference</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">It takes a village. Whether you're an individual wanting to volunteer, a company offering jobs, or a student seeking guidance.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Volunteer Time",
              desc: "Join our health camps, training sessions, or localized social drives.",
              btn: "Become a Volunteer",
              bg: "bg-white text-gray-800",
              btnCol: "bg-brand-orange text-white hover:bg-orange-700"
            },
            {
              title: "Donate for Better skill India Education",
              desc: "Your contributions help us empower youth with essential career skills across India.",
              btn: "Donate Now",
              bg: "bg-brand-orange text-white",
              btnCol: "bg-white text-brand-orange hover:bg-orange-50"
            },
            {
              title: "Enroll / Register",
              desc: "Students and graduates can register for upcoming internships and seminars.",
              btn: "Register Now",
              bg: "bg-white text-gray-800",
              btnCol: "bg-brand-lightBlue text-white hover:bg-blue-700"
            }
          ].map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-3xl p-8 lg:p-10 shadow-lg flex flex-col ${card.bg}`}
            >
              <h3 className="text-2xl font-heading font-semibold mb-4">{card.title}</h3>
              <p className={`mb-8 flex-1 leading-relaxed ${card.bg.includes('orange') ? 'text-orange-100' : 'text-gray-600'}`}>{card.desc}</p>
              <button className={`w-full min-h-[52px] rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${card.btnCol}`}>
                {card.btn} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'I want to volunteer', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill out all required fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await axios.post('/api/contact', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: `Phone: ${form.phone || 'N/A'}\n\n${form.message}`
      });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', subject: 'I want to volunteer', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || 'Failed to send message. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/3 flex flex-col justify-center"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-brand-blue mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-10 text-lg">We are always open to discussing new partnerships, volunteer inquiries, or answering questions from our student community.</p>
          
          <div className="space-y-8">
            <div className="flex gap-5 items-center">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-brand-lightBlue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Our Base</h4>
                <p className="text-gray-600">Belgaum, Karnataka, India</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-center">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 text-brand-lightBlue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Call Us</h4>
                <p className="text-gray-600">Main: +91 00000 00000</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-center">
              <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-brand-orange" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Email Us</h4>
                <p className="text-gray-600">info@veertronsfoundation.org</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:w-2/3"
        >
          <form onSubmit={handleSubmit} className="bg-white border text-left border-gray-100 shadow-xl p-8 lg:p-12 rounded-[2rem]">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-brand-blue mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We will get back to you shortly.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-8 text-brand-orange font-bold hover:underline">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="John Doe" required className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="john@example.com" required className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">How can we help? <span className="text-red-500">*</span></label>
                  <select name="subject" value={form.subject} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors text-gray-700">
                    <option>I want to volunteer</option>
                    <option>Interested in Sponsorship/Partnership</option>
                    <option>Register for an internship</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} required placeholder="Type your message here..." className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors resize-none"></textarea>
                </div>
                <button disabled={status === 'loading'} type="submit" className="w-full min-h-[56px] text-lg bg-brand-blue hover:bg-blue-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'loading' ? <><Loader className="w-5 h-5 animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Vision />
      <Programs />
      <GetInvolved />
      <Contact />
    </>
  );
}
