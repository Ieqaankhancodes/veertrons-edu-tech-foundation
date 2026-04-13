import { Link } from 'react-router-dom';
import { Heart, Camera, MapPin, Mail, Phone, ArrowUpRight, CheckCircle2, Video, Code } from 'lucide-react';
import logo from '../assets/vetf_logo.png';

export default function Footer() {
  const QUICK_LINKS = [
    { name: 'Our Identity', href: '/#mission' },
    { name: 'Key Programs', href: '/#programs' },
    { name: 'Support Us', href: '/donate' },
    { name: 'Contact Form', href: '/#contact' },
    { name: 'Admin Portal', href: '/admin/login' },
  ];

  const PROGRAMS = [
    { name: 'Career & Tech Education', href: '/#programs' },
    { name: 'Women Empowerment', href: '/#programs' },
    { name: 'Health & Wellness Camps', href: '/#programs' },
    { name: 'Early Childhood Care', href: '/#programs' },
  ];

  return (
    <footer className="bg-brand-blue relative overflow-hidden pt-20 border-t-4 border-brand-orange">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <Link to="/" className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-2xl hover:bg-white/10 transition-colors border border-white/10" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-16 h-12 flex items-center justify-center overflow-hidden bg-white rounded-xl shadow-inner">
                <img src={logo} alt="Veertrons Logo" className="w-[85%] h-[85%] object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-white text-lg leading-none uppercase tracking-wide">Veertrons</span>
                <span className="text-brand-orange font-sans font-bold text-[10px] tracking-[0.2em] uppercase mt-1">Foundation</span>
              </div>
            </Link>

            <p className="text-blue-100 text-sm leading-relaxed mb-8 max-w-sm">
              Empowering communities through comprehensive support in education, health, and sustainable career development. Building tomorrow's leaders today.
            </p>

            <div className="w-full max-w-sm">
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange" /> Stay Updated
              </h4>
              <form className="flex bg-white/10 p-1.5 rounded-xl border border-white/20 focus-within:border-brand-orange/50 transition-colors" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-transparent flex-1 px-4 text-white placeholder:text-blue-200/60 focus:outline-none text-sm"
                  required
                />
                <button type="submit" className="bg-brand-orange hover:bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                  Join <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 lg:pl-8">
            <h4 className="text-white font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Explore
            </h4>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-brand-lightBlue group-hover:text-brand-orange transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Core Initiatives
            </h4>
            <ul className="space-y-4">
              {PROGRAMS.map((prog) => (
                <li key={prog.name} className="flex flex-col gap-1 text-sm bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group cursor-pointer">
                  <span className="text-white font-semibold flex items-center justify-between">
                    {prog.name}
                    <CheckCircle2 className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Deep Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Bar Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">

          {/* Socials & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-blue-200/80 text-sm">
              &copy; {new Date().getFullYear()} Veertrons Edu-Tech Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {/* Social placeholders */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:-translate-y-1 transition-all border border-white/10">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:-translate-y-1 transition-all border border-white/10">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>



        </div>
      </div>
    </footer>
  );
}

function ChevronRight({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
