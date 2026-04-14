import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/vetf_logo.png';

const NAV_LINKS = [
  { name: 'Our Mission', href: '/#mission' },
  { name: 'Programs', href: '/#programs' },
  { name: 'Get Involved', href: '/#get-involved' },
  { name: 'Contact Us', href: '/#contact' }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [menuOpen]);

  // Handle smooth scrolling for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 bg-gradient-to-r from-white/90 via-blue-50/50 to-white/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.05)] py-2 border-b border-white/60' : 'bg-white/30 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-b lg:border-none border-white/30 py-3 lg:py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-16 h-12 sm:w-24 sm:h-16 flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Veertrons Foundation"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-brand-blue text-base sm:text-xl leading-none uppercase tracking-wide">Veertrons</span>
            <span className="text-gray-500 font-sans font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-1">Foundation</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="relative text-[14px] font-sans font-bold text-brand-blue hover:text-brand-orange uppercase tracking-wider transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/donate"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-orange-500 text-white px-7 py-3 rounded-full text-[14px] font-sans font-bold uppercase tracking-wider shadow-[0_8px_20px_-6px_rgba(234,88,12,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(234,88,12,0.6)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Heart className="w-4 h-4 fill-white/20" /> Donate
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2.5 text-brand-blue bg-white/70 backdrop-blur-sm bg-gradient-to-br from-white to-blue-50/50 shadow-sm border border-white hover:bg-white rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 bg-gradient-to-b from-white to-orange-50/30 backdrop-blur-lg border-t border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4 max-h-[calc(100vh-80px)] overflow-y-auto pb-32">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-4 rounded-2xl text-lg font-heading font-semibold text-gray-800 hover:bg-brand-lightBlue/10 hover:text-brand-blue hover:pl-6 transition-all duration-300 border border-transparent hover:border-brand-lightBlue/20"
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-4 mt-2 border-t border-gray-100">
                <Link
                  to="/donate"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-orange to-orange-600 text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart className="w-5 h-5 fill-white" /> Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
