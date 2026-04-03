import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Users,
  Heart,
  Baby,
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';
import logo from './assets/vetf_logo.jpeg';

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: 'Our Mission', href: '#mission' },
  { name: 'Programs', href: '#programs' },
  { name: 'Get Involved', href: '#get-involved' },
  { name: 'Contact Us', href: '#contact' }
];

const PROGRAMS = [
  {
    category: 'Education & Career',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80', // Indian students reading
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
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80', // Indian community/women
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
    img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80', // Indian child smiling
    icon: Baby,
    desc: 'Providing a safe, nurturing foundation for the youngest minds to grow.',
    items: [
      'Play School',
      'Kindergarten Essentials',
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm py-2' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3 lg:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo Area */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <div className="w-16 h-12 sm:w-20 sm:h-14 bg-white rounded-md flex items-center justify-center overflow-hidden">
             <img 
               src={logo} 
               alt="Veertrons Foundation" 
               className="w-full h-full object-contain" 
             />
          </div>
          <div className="flex flex-col hidden sm:flex">
             <span className="font-heading font-bold text-brand-blue text-lg leading-tight uppercase tracking-wide">Veertrons</span>
             <span className="text-gray-500 font-medium text-xs tracking-widest uppercase">Foundation</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[15px] font-semibold text-gray-700 hover:text-brand-orange transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 lg:gap-5">
          <a
            href="#get-involved"
            className="hidden sm:inline-flex items-center justify-center bg-brand-orange text-white px-6 py-2.5 rounded-full text-[15px] font-bold shadow-md hover:bg-orange-700 hover:shadow-lg transition-all"
          >
            Volunteer Now
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-brand-blue bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-lg font-heading font-semibold text-gray-800 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="px-4 pt-4 pb-2">
                <a
                  href="#get-involved"
                  className="flex items-center justify-center w-full bg-brand-orange text-white px-6 py-3.5 rounded-xl text-base font-bold shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Volunteer Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-brand-light pt-28 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Mobile-first text content */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-brand-orange text-sm font-bold tracking-wide mb-6">
              <HeartHandshake className="w-4 h-4" /> Non-Profit Organization
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-brand-blue leading-[1.1] mb-6 text-balance">
              Empowering Minds. <span className="text-brand-orange">Uplifting Futures.</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From foundational early education to dynamic career placement and women’s empowerment, Veertrons Foundation bridges the gap between potential and real-world opportunity.
            </p>
            
            {/* Mobile optimized touch-targets */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#programs"
                className="flex items-center justify-center w-full sm:w-auto min-h-[52px] bg-brand-blue text-white px-8 rounded-xl font-bold text-base hover:bg-blue-900 transition-colors shadow-soft"
              >
                Our Programs
              </a>
              <a
                href="#get-involved"
                className="flex items-center justify-center w-full sm:w-auto min-h-[52px] bg-white text-brand-blue border-2 border-brand-lightBlue/20 px-8 rounded-xl font-bold text-base hover:bg-blue-50 hover:border-brand-lightBlue transition-colors"
              >
                Get Involved
              </a>
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="order-1 lg:order-2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Soft background shape for aesthetics */}
            <div className="absolute inset-0 bg-brand-orange/10 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
            
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl lg:rounded-[3rem] shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&q=80"
                alt="Children smiling together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 bg-white/95 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-lg max-w-[240px]">
                <p className="text-3xl font-heading font-extrabold text-brand-orange mb-1">360°</p>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Holistic Development Ecosystem</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="mission" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
        <HeartHandshake className="w-12 h-12 text-brand-lightBlue mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-blue mb-6">Our Vision & Mission</h2>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
          "At Veertrons Foundation, we do not view growth in isolation. We believe in complete, holistic development. By providing a strong base in early childhood, guiding students through pivotal exams, offering technical internships, and supporting women's health—we are building a self-sustaining ecosystem for lifelong success."
        </p>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="py-20 lg:py-28 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-blue mb-4">Core Focus Areas</h2>
          <p className="text-gray-600 text-lg">Structured into three distinct pillars to provide targeted, meaningful impact across all segments of our society.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROGRAMS.map((program, idx) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-100 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full">
                  <img
                    src={program.img}
                    alt={program.category}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay to ensure contrast */}
                  <div className="absolute inset-0 bg-brand-blue/10"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute -bottom-8 left-6 w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-50 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-brand-orange" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="pt-12 pb-8 px-6 lg:px-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-heading font-bold text-brand-blue mb-3">{program.category}</h3>
                  <p className="text-gray-600 mb-6 text-sm">{program.desc}</p>
                  
                  <div className="mt-auto space-y-3 bg-gray-50 p-4 rounded-2xl">
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
      {/* Texture mask */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4">You Can Make a Difference</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">It takes a village. Whether you're an individual wanting to volunteer, a company offering jobs, or a student seeking guidance.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Volunteer Time",
              desc: "Join our health camps, training sessions, or localized social drives.",
              btn: "Become a Volunteer",
              bg: "bg-white text-gray-800",
              btnCol: "bg-brand-orange text-white hover:bg-orange-700"
            },
            {
              title: "Partner With Us",
              desc: "Companies are invited to partner for our massive bi-annual job fairs.",
              btn: "Sponsor a Fair",
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
            <div key={i} className={`rounded-3xl p-8 shadow-lg flex flex-col ${card.bg}`}>
              <h3 className="text-2xl font-heading font-bold mb-3">{card.title}</h3>
              <p className={`mb-8 flex-1 ${card.bg.includes('orange') ? 'text-orange-100' : 'text-gray-600'}`}>{card.desc}</p>
              <button className={`w-full min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${card.btnCol}`}>
                {card.btn} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Contact Info */}
        <div className="lg:w-1/3">
          <h2 className="text-3xl font-heading font-extrabold text-brand-blue mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-10">We are always open to discussing new partnerships, volunteer inquiries, or answering questions from our student community.</p>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand-lightBlue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Our Base</h4>
                <p className="text-gray-600 text-sm">Belgaum, Karnataka<br/>India</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-brand-lightBlue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                <p className="text-gray-600 text-sm">Main: +91 00000 00000</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                <p className="text-gray-600 text-sm">info@veertronsfoundation.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form strictly designed for mobile typing ease */}
        <div className="lg:w-2/3">
          <form className="bg-white border text-left border-gray-100 shadow-soft p-6 lg:p-10 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
              <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">How can we help? <span className="text-red-500">*</span></label>
              <select className="w-full bg-gray-50 border border-gray-200 px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors text-gray-700">
                <option>I want to volunteer</option>
                <option>Interested in Sponsorship/Partnership</option>
                <option>Register for an internship</option>
                <option>Other Inquiry</option>
              </select>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea rows={4} placeholder="Type your message here..." className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-lightBlue focus:bg-white transition-colors resize-none"></textarea>
            </div>
            <button type="submit" className="w-full min-h-[52px] bg-brand-blue hover:bg-blue-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-16 h-12 bg-white rounded-md flex items-center justify-center overflow-hidden">
             <img src={logo} alt="Veertrons Foundation" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div>
            <p className="text-white font-heading font-bold uppercase tracking-wide">Veertrons</p>
            <p className="text-brand-lightBlue text-xs font-medium uppercase tracking-widest">Foundation</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-medium text-center md:text-right">
          &copy; {new Date().getFullYear()} Veertrons Foundation.<br className="md:hidden" /> All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [menuOpen]);

  return (
    <div className="selection:bg-brand-orange/20 selection:text-brand-blue">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Vision />
        <Programs />
        <GetInvolved />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
